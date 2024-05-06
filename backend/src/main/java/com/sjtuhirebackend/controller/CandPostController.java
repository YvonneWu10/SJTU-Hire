package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.CandPostService;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.ArrayList;

@RestController
@Slf4j
public class CandPostController {
    @Autowired
    private CandPostService candPostService;
    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;

    @RequestMapping("/candidate_view/DeliveredPost")
    public ResponseEntity<Map<String, Object>> getCandPostForCandidate(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candPostService.getCandPostDetailByCandId(id), HttpStatus.OK);
    }

    @RequestMapping("/hr_view/forwardSubmissionStage/{candId}/{postId}")
    public ResponseEntity<String> forwardSubmissionStage(@RequestHeader Map<String, Object> header,
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
        candPostService.forwardSubmissionStageByCandIdAndPostId(candId, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @RequestMapping("/hr_view/terminateSubmissionStage/{candId}/{postId}")
    public ResponseEntity<String> terminateSubmissionStage(@RequestHeader Map<String, Object> header,
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
        candPostService.terminateSubmissionStageByCandIdAndPostId(candId, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}