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

    // 根据条件筛选符合要求的公司
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

    // 根据公司id获取公司详细信息
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

    @RequestMapping("/company/getAllCompany")
    public ResponseEntity<List<Company>> getAllCompany(@RequestHeader Map<String, Object> header) {
        String userType = (String) header.get("user-type");
        String id = null;
        if ("candidate".equals(userType)) {
            id = authService.getCandIdByHeader(header);
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(companyService.getCompanies(), HttpStatus.OK);
    }

    // 管理者搜索满足条件的所有公司
    @RequestMapping(value = {"/administer/SearchCompanies"})
    public ResponseEntity<List<Company>> searchCompanies(@RequestHeader Map<String, Object> header,
                                                  @RequestParam(defaultValue = "") String companyName,
                                                  @RequestParam(defaultValue = "") String companyType,
                                                     @RequestParam(defaultValue = "") String companyScale) {
        String userType = (String) header.get("user-type");
        String id = null;
        if ("candidate".equals(userType)) {
            id = authService.getCandIdByHeader(header);
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        List<Company> result = companyService.getCompanies();  //获取所有公司

        // 根据companyName筛选
        if (!Objects.equals(companyName, "")) {
            result.retainAll(companyService.getCompanyByName(companyName));
        }

        // 根据companyType筛选
        if (!Objects.equals(companyType, "")) {
            result.retainAll(companyService.getCompanyByType(companyType));
        }

        // 根据companyScale筛选
        if (!Objects.equals(companyScale, "")) {
            result.retainAll(companyService.getCompanyByScale(companyScale));
        }


        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 删除公司
    @DeleteMapping(value = "/deleteCompany/{companyId}")
    public ResponseEntity<String> deleteCompanyById(@RequestHeader Map<String, Object> header,
                                                 @PathVariable Integer companyId) {
        // 检查管理员权限
        String userType = (String) header.get("user-type");
        String id = null;
        if ("HR".equals(userType)) {
            id = authService.getHRIdByHeader(header).toString();
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }

        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // 检查是否提供了有效的postId
        if (companyId == null || companyId <= 0) {
            System.out.println("Invalid id: " + id);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // 检查是否存在对应post
        if (companyService.getCompany(companyId) == null) {
            System.out.println("No company id: " + id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 调用服务层删除
        companyService.deleteCompany(companyId);
        // 删除成功
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

}
