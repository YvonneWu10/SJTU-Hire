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
//    Map<String,Object> getCandPostByHRId(int hrId);
    List<CandPost> getPagedCandPosts(int pageIndex, int pageSize); //分页列举
    int getTotalPages(int pageSize);    //总页数
    void deleteCandPost(String candId, int postId);
    long countPosts(); //返回所有有投递的岗位数
    List<Object[]> getHotJobId(int rank);   // 得到热门的前rank个岗位id
    Map<String,Object> getCandPostInfoByHRId(int hrId);
    List<CandPost> getCandPostByCandIdInAndPostId(List<String> candIds, Integer postId);
    List<CandPost> getCandPostByHRId(int hrId);
    void forwardSubmissionStageByCandIdAndPostId(String candId, Integer postId);
    List<CandPost> getCandPostBySubmissionStageIsNot(String submissionStage);
    void insertCandPostByInvitation(String CandId, Integer postId);
    // 获取求职者投递的岗位详情
    Map<String, Object> getDeliveredCandPostDetailByCandId(String candidateId);
    List<CandPost> getCandPostByCandIdIn(List<String> candIds);
    List<CandPost> getCandPostByPostIdIn(List<Integer> postIds);
    // 终止求职者candId在岗位postId的流程
    void terminateSubmissionStageByCandIdAndPostId(String candId, Integer postId);
    // 添加投递记录
    void insertCandPostByDelivery(String candId, Integer postId);
    // 获取求职者在stage阶段的岗位详情
    Map<String, Object> getCandPostByCandIdAndSubmissionStage(String candId, String stage);
    // 求职者candId接受在岗位postId的邀请
    void acceptInvitationByCandIdAndPostId(String candId, Integer postId);
    // 求职者candId拒绝在岗位postId的邀请
    void refuseInvitationByCandIdAndPostId(String candId, Integer postId);
}
