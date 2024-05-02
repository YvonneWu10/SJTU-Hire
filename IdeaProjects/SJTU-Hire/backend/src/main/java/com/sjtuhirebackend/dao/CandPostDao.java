package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;

import java.util.Date;
import java.util.List;

public interface CandPostDao {
    List<CandPost> getAllCandPosts();
    CandPost getCandPostByCandIdAndPostId(String candId, int postId);
    List<CandPost> getCandPostByCandId(String candId);
    List<CandPost> getCandPostByPostId(int postId);
    List<CandPost> getCandPostByPostIdIn(List<Integer> postIds);
    List<CandPost> getCandPostBySubmissionDate(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBefore(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateAfter(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBetween(Date lb, Date ub);
    List<CandPost> getCandPostBySubmissionStage(String submissionStage);
    List<CandPost> getPagedCandPosts(int pageIndex,int pageSize);
    long count();
}
