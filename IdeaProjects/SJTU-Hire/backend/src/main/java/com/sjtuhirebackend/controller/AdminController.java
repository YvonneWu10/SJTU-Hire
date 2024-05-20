package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;
    @Autowired
    private CandPostService candPostService;
    @Autowired
    private HRService hrService;
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private CompanyService companyService;

    @RequestMapping("/administer-main/adminname")
    public ResponseEntity<Map<String, Object>> getAdminNameByToken(@RequestHeader Map<String, Object> header) {
        String id = authService.getAdminIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String name = adminService.getAdminNameByID(id);

        return new ResponseEntity<>(Map.of("adminname", name), HttpStatus.OK);
    }

    @RequestMapping("/administer/postInProgressData")
    public ResponseEntity<Map<String, Object>> getPostInProgressData(){
        long postCount = postService.getPostCount();
        long candPostCount = candPostService.countPosts();
        double ratio = (double) candPostCount / postCount;
        if (postCount == 0){
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);   //防止除以0
        }
        return new ResponseEntity<>(Map.of("data", ratio), HttpStatus.OK);
    }

    @RequestMapping("/postNum")
    public ResponseEntity<Map<String, Object>> getPostNum(){
        long postCount = postService.getPostCount();
        return new ResponseEntity<>(Map.of("data", postCount), HttpStatus.OK);
    }

    @RequestMapping("/candidateNum")
    public ResponseEntity<Map<String, Object>> getCandidateNum(){
        long candidateCount = candidateService.candidateCount();
        return new ResponseEntity<>(Map.of("data", candidateCount), HttpStatus.OK);
    }

    @RequestMapping("/HRNum")
    public ResponseEntity<Map<String, Object>> getHRNum(){
        long HRCount = hrService.HRCount();
        return new ResponseEntity<>(Map.of("data", HRCount), HttpStatus.OK);
    }

    @RequestMapping("/companyNum")
    public ResponseEntity<Map<String, Object>> getCompanyNum(){
        long companyCount = companyService.companyCount();
        return new ResponseEntity<>(Map.of("data", companyCount), HttpStatus.OK);
    }
}
