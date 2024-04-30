package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.*;
import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@Slf4j
public class HRController {
    @Autowired
    private CandPostService candPostService;

    @Autowired
    private HRService hrService;

    @Autowired
    private PostService postService;

    @Autowired
    private AuthService authService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private DepartmentService departmentService;

    // 根据HRID，查询对应的PostID，并根据PostID提取所有负责的已投递的简历
    // 感觉是根据token分析啥的，但是这里就先根据HRID=1来进行返回了
    @RequestMapping("/hr_view")
    public ResponseEntity<Map<String, Object>> getCandPostforHR(@RequestHeader Map<String, Object> header,
                                                                 @RequestParam(defaultValue = "") String candName,
                                                                 @RequestParam(defaultValue = "") String postName) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        // 根据HRID查找负责的post
        return new ResponseEntity<>(candPostService.getCandPostByHRId(id), HttpStatus.OK);
    }

    @RequestMapping("/hr_view/candPostDetail/{candId}/{postId}")
    public ResponseEntity<Map<String, Object>> getCandPostDetail(@RequestHeader Map<String, Object> header,
                                                                 @PathVariable String candId,
                                                                 @PathVariable Integer postId) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null || candId == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 确定是否这个HR有权限访问这个candPost
        Post post = postService.getPostById(postId);
        if (post.getHRId() != id){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(candPostService.getCandPostDetailByCandIdAndPostId(candId, postId), HttpStatus.OK);
    }

    @RequestMapping("/hr_view/user")
    public ResponseEntity<Map<String, Object>> getHRInfo(@RequestHeader Map<String, Object> header) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        HR hr = hrService.getHR(id);
        if (hr == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        Company company = companyService.getCompany(hr.getCompanyId());
        Department department = departmentService.getByCompanyIdAndDepartmentId(hr.getCompanyId(), hr.getDepartmentId());
        Map<String,Object> ans = new HashMap<>();
        //调用put()方法增添数据
        ans.put("HRInfo", hr);
        ans.put("companyInfo", company);
        ans.put("departmentInfo", department);
        // 根据HRID查找负责的post
        return new ResponseEntity<>(ans, HttpStatus.OK);
    }

//    @RequestMapping("/hr_view/forwardSubmissionStage/{candId}/{postId}")
//    public ResponseEntity<Map<String, Object>> forwardSubmissionStage(@RequestHeader Map<String, Object> header,
//                                                                      @PathVariable String candId,
//                                                                      @PathVariable Integer postId) {
//        Integer id = authService.getHRIdByHeader(header);
//        if (id == null) {
//            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//        }
//
//        if (postId == null || candId == null){
//            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//        }
//
//        // 确定是否这个HR有权限访问这个candPost
//        Post post = postService.getPostById(postId);
//        if (post.getHRId() != id){
//            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
//        }
//        return new ResponseEntity<>(candPostService.forwardSubmissionStageByCandIdAndPostId(candId, postId), HttpStatus.OK);
//    }
}
