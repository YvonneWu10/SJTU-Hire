package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;

import java.util.Date;
import java.util.List;

public interface CandPostDao {
    List<CandPost> getAllCandPosts();
    // 根据求职者id和岗位id查找求职者-岗位关系
    CandPost getCandPostByCandIdAndPostId(String candId, int postId);
    List<CandPost> getCandPostByCandId(String candId);
    // 获取求职者candId已投递的岗位列表
    List<CandPost> getDeliveredCandPostByCandId(String candId);
    List<CandPost> getCandPostByPostId(int postId);
    List<CandPost> getCandPostByPostIdIn(List<Integer> postIds);
    List<CandPost> getCandPostBySubmissionDate(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBefore(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateAfter(Date submissionDate);
    List<CandPost> getCandPostBySubmissionDateBetween(Date lb, Date ub);
    List<CandPost> getCandPostBySubmissionStage(String submissionStage);
    List<CandPost> getPagedCandPosts(int pageIndex,int pageSize);
    long count();
    void deleteCandPost(String candId, int postId);
    long countPosts();
    List<Object[]> getHotJobId(int rank);
    List<CandPost> getCandPostByCandIdInAndPostId(List<String> candIds, Integer postId);
    List<CandPost> getCandPostByCandIdIn(List<String> candIds);
    List<CandPost> getCandPostBySubmissionStageIsNot(String submissionStage);
    void insertCandPost(String candId, Integer postId, Date submissionDate, String submissionStage);
    // // 获取求职者在stage阶段的岗位列表
    List<CandPost> getCandPostByCandIdAndSubmissionStage(String candId, String stage);
    // 修改求职者candId在岗位postId的投递阶段
    void updateSubmissionStageByBiIdCandIdAndBiIdPostId(String submissionStage, String candId, Integer PostId);
    // 修改求职者candId在岗位postId的投递阶段和投递时间
    void updateSubmissionStageAndSubmissionDateByBiIdCandIdAndBiIdPostId(String submissionStage, Date date, String candId, Integer postId);
    // 删除求职者candId在岗位postId的投递记录
    void deleteCandPostByCandIdAndPostId(String candId, Integer postId);
    // 保存投递记录
    void save(CandPost candPost);
}
