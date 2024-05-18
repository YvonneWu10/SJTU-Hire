package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;

import java.util.Date;
import java.util.List;

public interface CandPostDao {
    List<CandPost> getAllCandPosts();
    CandPost getCandPostByCandIdAndPostId(String candId, int postId);
    List<CandPost> getCandPostByCandId(String candId);
    List<CandPost> getDeliveredCandPostByCandId(String candId);
    List<CandPost> getCandPostByPostId(int postId);
    List<CandPost> getCandPostByPostIdIn(List<Integer> postIds);
    List<CandPost> getCandPostBySubmissionDate(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBefore(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateAfter(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBetween(Date lb, Date ub);
    List<CandPost> getCandPostBySubmissionStage(String submissionStage);
    List<CandPost> getCandPostByCandIdInAndPostId(List<String> candIds, Integer postId);
    List<CandPost> getCandPostByCandIdIn(List<String> candIds);
    List<CandPost> getCandPostByCandIdAndSubmissionStage(String candId, String stage);
    List<CandPost> getCandPostBySubmissionStageIsNot(String submissionStage);

    void updateSubmissionStageByBiIdCandIdAndBiIdPostId(String submissionStage, String candId, Integer PostId);
    void insertCandPost(String candId, Integer postId, Date submissionDate, String submissionStage);
    void updateSubmissionStageAndSubmissionDateByBiIdCandIdAndBiIdPostId(String submissionStage, Date date, String candId, Integer postId);
    void deleteCandPostByCandIdAndPostId(String candId, Integer postId);
    void save(CandPost candPost);
}
