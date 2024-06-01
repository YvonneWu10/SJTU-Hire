package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
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
    @Autowired
    private PostService postService;


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

    // 用于获得所有没有提交过hr负责岗位记录的应聘者信息
    @RequestMapping("/hr_view/allCandidates")
    public ResponseEntity<List<Candidate>> getAllAvailableCandidates(@RequestHeader Map<String, Object> header,
                                                                     @RequestParam(defaultValue = "") String candDegree,
                                                                     @RequestParam Integer candWorkYear) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        List<Candidate> result = candidateService.getAllCandidatesAvailable(id);

        if (!Objects.equals(candDegree, "")) {
            List<Candidate> resDegree = candidateService.getCandidatesByCandDegree(candDegree);
            result.retainAll(resDegree);
        }

        if (!Objects.equals(candWorkYear, 0)) {
            List<Candidate> resWorkYear = candidateService.getCandidatesByCandWorkYearAfter(candWorkYear);
            result.retainAll(resWorkYear);
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    // 根据招聘身份证号获得其个人信息
    @RequestMapping("/hr_view/getCandInfoByCandId/{candId}")
    public ResponseEntity<Candidate> HRgetCandInfoByCandId(@RequestHeader Map<String, Object> header,
                                                           @PathVariable String candId) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candidateService.getCandidatesByCandId(candId), HttpStatus.OK);
    }

    // 获取求职者详细信息
    @RequestMapping("/candidate_view/PersonalCenter")
    public ResponseEntity<Map<String, Object>> getCandInfoByCandToken(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candidateService.getCandInfoByCandId(id), HttpStatus.OK);
    }

    // 修改求职者简历
    @RequestMapping("/candidate_view/CandidateEdit")
    public ResponseEntity<Map<String, Object>> editCandidateInfo(@RequestHeader Map<String, Object> header,
                                                                 @RequestBody Map<String, Object> body) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> values = (Map<String, Object>) body.get("values");
        List<Integer> deletedProjects = (List<Integer>) body.get("deletedProjects");

        if (values == null || deletedProjects == null) {
            System.out.println("editCandidateInfo: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        candidateService.editCandidateInfo(id, values, deletedProjects);
        Map<String, Object> ans = new HashMap<>();
        ans.put("status", "success");
        return new ResponseEntity<>(ans, HttpStatus.OK);
    }

    // 修改求职者密码
    @RequestMapping("/candidate_view/ChangePassword")
    public ResponseEntity<Map<String, Object>> changeCandidatePassword(@RequestHeader Map<String, Object> header,
                                                                       @RequestBody Map<String, Object> body) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String oldPassword = (String) body.get("oldPassword");
        String newPassword = (String) body.get("newPassword");

        if (oldPassword == null || newPassword == null) {
            System.out.println("changeCandidatePassword: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(candidateService.changePassword(id, oldPassword, newPassword), HttpStatus.OK);
    }

    // 求职者注销
    @RequestMapping("/candidate_view/DeleteAccount")
    public ResponseEntity<Map<String, Object>> deleteCandidateAccount(@RequestHeader Map<String, Object> header,
                                                                      @RequestBody Map<String, Object> body) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String candidateId = (String) body.get("candidateId");
        String password = (String) body.get("password");

        if (candidateId == null || password == null) {
            System.out.println("changeCandidatePassword: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(candidateService.deleteAccount(id, candidateId, password), HttpStatus.OK);
    }

    // 求职者注册账号
    @RequestMapping("/candidate_view/Register")
    public ResponseEntity<Map<String, Object>> candidateRegister(@RequestBody Map<String, Object> body) {
        String candidateName = (String) body.get("candidateName");
        String candidateId = (String) body.get("candidateId");
        String password = (String) body.get("password");

        if (candidateName == null ||candidateId == null || password == null) {
            System.out.println("changeCandidatePassword: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(candidateService.register(candidateName, candidateId, password), HttpStatus.OK);
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
