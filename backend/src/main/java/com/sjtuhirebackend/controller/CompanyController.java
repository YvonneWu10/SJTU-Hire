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
