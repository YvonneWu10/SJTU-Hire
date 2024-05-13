package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CandidateService;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.*;

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

    @RequestMapping("/candidate_view/PersonalCenter")
    public ResponseEntity<Map<String, Object>> getCandInfoByCandToken(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candidateService.getCandInfoByCandId(id), HttpStatus.OK);
    }

    @RequestMapping("/candidate_view/CandidateEdit")
    public ResponseEntity<Map<String, Object>> editCandidateInfo(@RequestHeader Map<String, Object> header,
                                                                 @RequestBody Map<String, Object> body) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> values = (Map<String, Object>) body.get("values");
        List<Integer> deletedProjects = (List<Integer>) body.get("deletedProjects");
//        System.out.println(values);
//        System.out.println(deletedProjects);

        if (values == null || deletedProjects == null) {
            System.out.println("editCandidateInfo: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        candidateService.editCandidateInfo(id, values, deletedProjects);
        Map<String, Object> ans = new HashMap<>();
        ans.put("status", "success");
        return new ResponseEntity<>(ans, HttpStatus.OK);
    }
}