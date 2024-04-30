package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Company;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
