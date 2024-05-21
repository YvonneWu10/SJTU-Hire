package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

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

    @RequestMapping("/hotJob/{rank}")
    public ResponseEntity<List<Map<String, Object>>> getHotJob(@PathVariable Integer rank){
        if (rank == null || rank < 0 ){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        List<Object[]> results = candPostService.getHotJobId(rank);

        // 提取hotJobId
        List<Integer> hotJobId = new ArrayList<>();
        Map<Integer, Long> postCountMap = new HashMap<>();
        for (Object[] result : results) {
            Integer postId = (Integer) result[0];
            Long count = (Long) result[1];
            hotJobId.add(postId);
            postCountMap.put(postId, count);
        }

        // 获取Post对象
        List<Post> hotJobs = postService.getPostsByPostIds(hotJobId);

        // 封装Post对象和计数
        List<Map<String, Object>> response = new ArrayList<>();
        for (Post post : hotJobs) {
            Map<String, Object> postWithCount = new HashMap<>();
            postWithCount.put("post", post);
            postWithCount.put("count", postCountMap.get(post.getPostId()));
            response.add(postWithCount);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping("/countCandidatesByAgeRange")
    public ResponseEntity<List<Map<String, Object>>> getCandidateAgeDistribution() {
        List<Object[]> results = candidateService.countCandidatesByAgeRange();
        List<Map<String, Object>> ageData = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> ageMap = new HashMap<>();
            ageMap.put("name", result[0]);
            ageMap.put("value", result[1]);
            ageData.add(ageMap);
        }
        return new ResponseEntity<>(ageData, HttpStatus.OK);
    }

    @RequestMapping("/candidateDegreeDistribution")
    public ResponseEntity<List<Map<String, Object>>> getCandidateDegreeDistribution() {
        List<Object[]> results = candidateService.countCandidatesByDegree();
//        System.out.println("candidateDegreeDistribution: " + results);
        List<Map<String, Object>> degreeData = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> degreeMap = new HashMap<>();
            if (result[0] == null || result[0] == ""){
                degreeMap.put("name", "其他");
                degreeMap.put("value", result[1]);
            }
            degreeMap.put("name", result[0]);
            degreeMap.put("value", result[1]);
            degreeData.add(degreeMap);
        }
        return new ResponseEntity<>(degreeData, HttpStatus.OK);
    }

    @RequestMapping("/salaryAndDegreeNum")
    public ResponseEntity<List<Map<String, Object>>> getSalaryAndDegreeNum(){
        List<Object[]> results = postService.countPostsBySalaryAndDegree();
        List<Map<String, Object>> data = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> map = new HashMap<>();
            map.put("name", result[0]);
            map.put("value", result[1]);
            map.put("type", result[2]);
            data.add(map);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @RequestMapping("/salaryDistribution")
    public ResponseEntity<List<Map<String, Object>>> getSalaryDistribution(){
        List<Map<String, Object>> combinedResults = new ArrayList<>();
        // Fetch and transform post data
        List<Object[]> postData = postService.findSalaryDistributionByPost();
        for (Object[] result : postData) {
            Map<String, Object> dataMap = new HashMap<>();
            dataMap.put("name", result[0]);
            dataMap.put("value", result[1]);
            dataMap.put("type", result[2]);
            combinedResults.add(dataMap);
        }
        // Fetch and transform candidate data
        List<Object[]> candidateData = candidateService.findSalaryExpectationsByCandidate();
        for (Object[] result : candidateData) {
            Map<String, Object> dataMap = new HashMap<>();
            dataMap.put("name", result[0]);
            dataMap.put("value", result[1]);
            dataMap.put("type", result[2]);
            combinedResults.add(dataMap);
        }
        return new ResponseEntity<>(combinedResults, HttpStatus.OK);
    }

    @RequestMapping("/cityDistribution")
    public ResponseEntity<List<Map<String, Object>>> getCityDistribution(){
        List<Object[]> cityData = postService.findRecruitmentByCity();
//        System.out.println("cityDis: " + cityData);
        List<Map<String, Object>> data = new ArrayList<>();
        for (Object[] result : cityData) {
            Map<String, Object> dataMap = new HashMap<>();
            dataMap.put("name", result[0]);
            dataMap.put("value", result[1]);
            data.add(dataMap);
        }
        return new ResponseEntity<>(data, HttpStatus.OK);
    }
}
