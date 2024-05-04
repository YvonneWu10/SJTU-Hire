package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.CandPost;

import java.util.Date;
import java.util.List;
import java.util.Map;


public interface CandPostService {
    List<CandPost> getAllCandPosts();
    CandPost getCandPostByCandIdAndPostId(String candId, int postId);
    Map<String,Object> getCandPostDetailByCandIdAndPostId(String candId, int postId);
    List<CandPost> getCandPostByCandId(String candId);
    List<CandPost> getCandPostByPostId(int postId);
    List<CandPost> getCandPostBySubmissionDate(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBefore(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateAfter(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBetween(Date lb, Date ub);
    List<CandPost> getCandPostBySubmissionStage(String submissionStage);
    Map<String,Object> getCandPostByHRId(int hrId);
    Map<String, Object> getCandPostDetailByCandId(String candidateId);
}
