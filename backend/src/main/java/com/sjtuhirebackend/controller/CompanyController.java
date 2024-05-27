package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Company;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@RestController
@Slf4j
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @Autowired
    private AuthService authService;

    @RequestMapping("/candidate_view/SearchCompany")
    public ResponseEntity<List<Company>> searchCompany(@RequestHeader Map<String, Object> header,
                                                       @RequestParam(defaultValue = "") String companyName,
                                                       @RequestParam(defaultValue = "") String companyType,
                                                       @RequestParam(defaultValue = "") String financingStage,
                                                       @RequestParam(defaultValue = "") String companyScale) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (Objects.equals(companyName, "") && Objects.equals(companyType, "") && Objects.equals(financingStage, "") && Objects.equals(companyScale, "")) {
            return new ResponseEntity<>(companyService.getCompanies(), HttpStatus.OK);
        }

        List<Company> result = new ArrayList<>();
        boolean flag = false;

        if (!Objects.equals(companyName, "")) {
            flag = true;
            result = companyService.getCompanyByName(companyName);
        }

        if (!Objects.equals(companyType, "")) {
            if (flag && result.isEmpty()) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

            List<Company> typeRes = companyService.getCompanyByType(companyType);
            if (!flag) {
                flag = true;
                result = typeRes;
            } else {
                result.retainAll(typeRes);
            }
        }

        if (!Objects.equals(financingStage, "")) {
            if (flag && result.isEmpty()) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

            List<Company> stageRes = companyService.getCompanyByFinancingStage(financingStage);
            if (!flag) {
                flag = true;
                result = stageRes;
            } else {
                result.retainAll(stageRes);
            }
        }

        if (!Objects.equals(companyScale, "")) {
            if (flag && result.isEmpty()) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

            List<Company> scaleRes = companyService.getCompanyByScale(companyScale);
            if (!flag) {
                flag = true;
                result = scaleRes;
            } else {
                result.retainAll(scaleRes);
            }
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/candidate_view/Company/{companyId}")
    public ResponseEntity<Map<String, Object>> getCompanyDetailById(@RequestHeader Map<String, Object> header,
                                                                    @PathVariable Integer companyId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (companyId == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(companyService.getCompanyDetailById(companyId), HttpStatus.OK);
    }

    // HR更改公司信息，将其提交数据库
    @RequestMapping("/hr_view/editCompany/")
    public ResponseEntity<Map<String, Object>> editCompanyDetail(@RequestHeader Map<String, Object> header,
                                                 @RequestBody Map<String, Object> map) throws ParseException {

        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(companyService.editCompany(map), HttpStatus.OK);
    }

    @RequestMapping("/getAllCompanies")
    public ResponseEntity<List<String>> getAllCompanies(){
        return new ResponseEntity<>(companyService.getAllCompanyNames(), HttpStatus.OK);
    }
}