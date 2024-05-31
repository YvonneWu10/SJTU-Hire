package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CandidateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Objects;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Department;

import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CandidateService;
import com.sjtuhirebackend.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class CandidateController {
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private AuthService authService;


    @RequestMapping("/candidate_view/username")
    public ResponseEntity<Map<String, Object>> getCandNameByCandToken(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String name = candidateService.getCandNameByCandId(id);

        return new ResponseEntity<>(Map.of("username", name), HttpStatus.OK);
    }

    @RequestMapping("/AllCandidates")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return new ResponseEntity<>(candidateService.getCandidates(), HttpStatus.OK);
    }

    // 管理者搜索满足条件的所有应聘者
    @RequestMapping("/administer/SearchCandidates")
    public ResponseEntity<List<Candidate>> searchCandidates(@RequestHeader Map<String, Object> header,
                                                            @RequestParam(defaultValue = "") String candName,
                                                            @RequestParam(defaultValue = "") String candUniversity,
                                                            @RequestParam(defaultValue = "") String candGender,
                                                            @RequestParam(defaultValue = "") String candMajor) {
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
        List<Candidate> result = candidateService.getCandidates();

        //根据candName筛选
        if (!Objects.equals(candName,"")){
            result.retainAll(candidateService.getCandidatesByCandName(candName));
        }
        //根据candUniversity筛选
        if (!Objects.equals(candUniversity,"")){
            result.retainAll(candidateService.getCandidatesByCandUniversity(candUniversity));
        }

        //根据candGender筛选
        if (!Objects.equals(candGender,"")){
            result.retainAll(candidateService.getCandidatesByCandGender(candGender));
        }
        //根据candMajor筛选
        if (!Objects.equals(candMajor,"")){
            result.retainAll(candidateService.getCandidatesByCandMajor(candMajor));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 管理者搜索所有的应聘者专业
    @RequestMapping("/administer/CandMajors")
    public ResponseEntity<List<String>> getCandMajors(@RequestHeader Map<String, Object> header) {
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

        return new ResponseEntity<>(candidateService.getDistinctCandMajors(), HttpStatus.OK);
    }

    // 管理者搜索所有应聘者学校
    @RequestMapping("/administer/CandUniversities")
    public ResponseEntity<List<String>> getCandUniversities(@RequestHeader Map<String, Object> header) {
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

        return new ResponseEntity<>(candidateService.getDistinctCandUniversities(), HttpStatus.OK);
    }

    // 删除应聘者
    @DeleteMapping(value = "/deleteCandidate/{candId}")
    public ResponseEntity<String> deleteCandidateById(@RequestHeader Map<String, Object> header,
                                                 @PathVariable String candId) {
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

        // 检查是否提供了有效的candId
        if (candId == null) {
            System.out.println("Invalid id: " + id);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // 检查是否存在对应cand
        if (candidateService.getCandidatesByCandId(candId) == null) {
            System.out.println("No company id: " + id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        System.out.println("NO problem before!!!!! ");
        // 调用服务层删除
        candidateService.deleteCandidate(candId);
        // 删除成功
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}