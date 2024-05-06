package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Company;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;


@RestController
@Slf4j
public class CompanyController {
    @Autowired
    private CompanyService companyService;
    @Autowired
    private AuthService authService;

    @RequestMapping("/candidate_view/SearchCompany")
    public ResponseEntity<List<Company>> searchPosts(@RequestHeader Map<String, Object> header,
                                                     @RequestParam(defaultValue = "") String companyName) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (Objects.equals(companyName, "")) {
            return new ResponseEntity<>(companyService.getCompanies(), HttpStatus.OK);
        }

        List<Company> result = new ArrayList<>();
        boolean flag = false;

        if (!Objects.equals(companyName, "")) {
            flag = true;
            result = companyService.getCompanyByName(companyName);
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
}
