package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.*;
import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    @RequestMapping("/administer/searchCandPost")
    public ResponseEntity<Map<String, Object>> AdminsearchCandPost(@RequestHeader Map<String, Object> header,
                                                                   @RequestParam(defaultValue = "") String candName,
                                                                   @RequestParam(defaultValue = "") String postName,
                                                                   @RequestParam(defaultValue = "0") int pageIndex,
                                                                   @RequestParam(defaultValue = "10") int pageSize) {
//        System.out.println("searchCandPost..."); //调试
        //鉴权
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
//        System.out.println("Authorization passed..."); //调试

        List<Map<String, Object>> result = new ArrayList<>();

        // 无筛选条件时使用分页查询
        if (Objects.equals(postName, "") && Objects.equals(candName, "")) {
            List<CandPost> candPosts = candPostService.getPagedCandPosts(pageIndex, pageSize);
//            System.out.println("前后页！！" + candPosts); //调试

            for (CandPost candPost : candPosts) {
                Map<String, Object> combined = new HashMap<>();
                Candidate candidate = candidateService.getCandidatesByCandId(candPost.getBiId().getCandId());
                Post post = postService.getPostById(candPost.getBiId().getPostId());

                combined.put("candID", candidate.getCandId());
                combined.put("candName", candidate.getCandName());
                combined.put("postID", post.getPostId());
                combined.put("postName", post.getPostName());
                combined.put("submissionDate", candPost.getSubmissionDate());
                combined.put("submissionStage", candPost.getSubmissionStage());

                result.add(combined);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("data", result);
            response.put("totalPages", candPostService.getTotalPages(pageSize));

            return ResponseEntity.ok(response);
        }

        System.out.println("In filter process...");

        // 如果有给定候选人名字，先根据候选人名字筛选候选人列表
        if (!Objects.equals(candName, "")) {
            List<Candidate> candidates = candidateService.getCandidatesByCandName(candName);
            for (Candidate candidate : candidates) {
                // 基于候选人ID获取其所有职位关系
                List<CandPost> candPosts = candPostService.getCandPostByCandId(candidate.getCandId());

                for (CandPost candPost : candPosts) {
                    // 通过 postID 获取职位信息
                    Post post = postService.getPostById(candPost.getBiId().getPostId());

                    // 检查职位名字是否匹配
                    if (Objects.equals(postName, "") || post.getPostName().equals(postName)) {
                        Map<String, Object> combined = new HashMap<>();
                        combined.put("candID", candidate.getCandId());
                        combined.put("candName", candidate.getCandName());
                        combined.put("postID", post.getPostId());
                        combined.put("postName", post.getPostName());
                        combined.put("submissionDate", candPost.getSubmissionDate());
                        combined.put("submissionStage", candPost.getSubmissionStage());

                        result.add(combined);
                    }
                }
            }
        }
        // 如果没有指定候选人名字而指定了职位名字，则先根据职位名字筛选职位列表
        else {
            List<Post> posts = postService.getPostByName(postName);

            for (Post post : posts) {
                // 基于职位ID获取其所有候选人关系
                List<CandPost> candPosts = candPostService.getCandPostByPostId(post.getPostId());

                for (CandPost candPost : candPosts) {
                    // 通过 candID 获取候选人信息
                    Candidate candidate = candidateService.getCandidatesByCandId(candPost.getBiId().getCandId());

                    Map<String, Object> combined = new HashMap<>();
                    combined.put("candID", candidate.getCandId());
                    combined.put("candName", candidate.getCandName());
                    combined.put("postID", post.getPostId());
                    combined.put("postName", post.getPostName());
                    combined.put("submissionDate", candPost.getSubmissionDate());
                    combined.put("submissionStage", candPost.getSubmissionStage());

                    result.add(combined);
                }
            }
        }


        Map<String, Object> response = new HashMap<>();
        response.put("data", result);
        response.put("totalPages", null);
        return ResponseEntity.ok(response);


    }

    @RequestMapping("/administer/SearchHRs")
    public ResponseEntity<List<HR>> searchHRs(@RequestHeader Map<String, Object> header,
                                              @RequestParam(defaultValue = "") String HRName) {
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

        List<HR> result = hrService.getHRs();

        //根据HRName筛选
        if (!Objects.equals(HRName,"")){
            result.retainAll(hrService.getHRByName(HRName));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
