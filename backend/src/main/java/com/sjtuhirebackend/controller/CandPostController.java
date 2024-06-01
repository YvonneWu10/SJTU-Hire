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

import java.util.Map;


@RestController
@Slf4j
public class CandPostController {
    @Autowired
    private CandPostService candPostService;
    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;

    // 获取求职者投递的岗位
    @RequestMapping("/candidate_view/DeliveredPost")
    public ResponseEntity<Map<String, Object>> getDeliveredCandPostForCandidate(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candPostService.getDeliveredCandPostDetailByCandId(id), HttpStatus.OK);
    }

    // 获取求职者被邀请的岗位
    @RequestMapping("/candidate_view/InvitedPost")
    public ResponseEntity<Map<String, Object>> getInvitedCandPostForCandidate(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candPostService.getCandPostByCandIdAndSubmissionStage(id, "邀请"), HttpStatus.OK);
    }

    // 获取求职者已结束流程的岗位
    @RequestMapping("/candidate_view/EndedPost")
    public ResponseEntity<Map<String, Object>> getEndedCandPostForCandidate(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candPostService.getCandPostByCandIdAndSubmissionStage(id, "流程终止"), HttpStatus.OK);
    }

    // 获取求职者已录取的岗位
    @RequestMapping("/candidate_view/AdmittedPost")
    public ResponseEntity<Map<String, Object>> getAdmittedCandPostForCandidate(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(candPostService.getCandPostByCandIdAndSubmissionStage(id, "录取"), HttpStatus.OK);
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
    // 根据id号终止招聘流程
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

    // 邀请该candidate应聘该岗位，在CandPost表格中增加一条邀请记录
    @RequestMapping("/hr_view/invite/{candId}/{postId}")
    public ResponseEntity<String> HRInvite(@RequestHeader Map<String, Object> header,
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
        candPostService.insertCandPostByInvitation(candId, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }


    // 求职者投递岗位postId
    @RequestMapping("/candidate_view/deliver/{postId}")
    public ResponseEntity<String> CandidateDeliverPost(@RequestHeader Map<String, Object> header,
                                                       @PathVariable Integer postId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        candPostService.insertCandPostByDelivery(id, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    // 求职者结束岗位postId的流程
    @RequestMapping("/candidate_view/end/{postId}")
    public ResponseEntity<String> CandidateEndProcess(@RequestHeader Map<String, Object> header,
                                                       @PathVariable Integer postId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        candPostService.terminateSubmissionStageByCandIdAndPostId(id, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    // 求职者接受岗位postId的邀请
    @RequestMapping("/candidate_view/accept/{postId}")
    public ResponseEntity<String> CandidateAcceptInvitation(@RequestHeader Map<String, Object> header,
                                                            @PathVariable Integer postId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        candPostService.acceptInvitationByCandIdAndPostId(id, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    // 求职者拒绝岗位postId的邀请
    @RequestMapping("/candidate_view/refuse/{postId}")
    public ResponseEntity<String> CandidateRefuseInvitation(@RequestHeader Map<String, Object> header,
                                                      @PathVariable Integer postId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        candPostService.refuseInvitationByCandIdAndPostId(id, postId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}