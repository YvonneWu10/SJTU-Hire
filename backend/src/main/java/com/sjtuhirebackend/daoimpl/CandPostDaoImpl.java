package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.CandPostDao;
import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import com.sjtuhirebackend.repository.CandPostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
@Slf4j
public class CandPostDaoImpl implements CandPostDao {
    @Autowired
    private CandPostRepository candPostRepository;

    public List<CandPost> getAllCandPosts(){
        return candPostRepository.findAll();
    }
    public CandPost getCandPostByCandIdAndPostId(String candId, int postId){
        return candPostRepository.findByBiIdCandIdAndBiIdPostId(candId, postId);
    }
    public List<CandPost> getCandPostByCandId(String candId){
        return candPostRepository.findByBiIdCandId(candId);
    }
    public List<CandPost> getCandPostByPostId(int postId){
        return candPostRepository.findByBiIdPostId(postId);
    }
    public List<CandPost> getCandPostByPostIdIn(List<Integer> postIds){
        return candPostRepository.findByBiIdPostIdIn(postIds);
    }
    public List<CandPost> getCandPostBySubmissionDate(Date submissionDate){
        return candPostRepository.findBySubmissionDate(submissionDate);
    }
    public List<CandPost> getCandPostBySubmissionDateBefore(Date submissionDate){
        return candPostRepository.findBySubmissionDateBefore(submissionDate);
    }
    public List<CandPost> getCandPostBySubmissionDateAfter(Date submissionDate){
        return candPostRepository.findBySubmissionDateAfter(submissionDate);
    }
    public List<CandPost> getCandPostBySubmissionDateBetween(Date lb, Date ub){
        return candPostRepository.findBySubmissionDateBetween(lb, ub);
    }
    public List<CandPost> getCandPostBySubmissionStage(String submissionStage){
        return candPostRepository.findBySubmissionStage(submissionStage);
    }
    public List<CandPost> getCandPostByCandIdInAndPostId(List<String> candIds, Integer postId){
        return candPostRepository.findByBiIdCandIdInAndBiIdPostId(candIds, postId);
    }
    public List<CandPost> getCandPostByCandIdIn(List<String> candIds){
        return candPostRepository.findByBiIdCandIdIn(candIds);
    }
    public List<CandPost> getCandPostByCandIdAndSubmissionStage(String candId, String stage) {
        return candPostRepository.findByBiIdCandIdAndSubmissionStage(candId, stage);
    }
    public void updateSubmissionStageByBiIdCandIdAndBiIdPostId(String submissionStage, String candId, Integer postId){
        candPostRepository.updateSubmissionStageByBiIdCandIdAndBiIdPostId(submissionStage, candId, postId);
    }
    public void updateSubmissionStageAndSubmissionDateByBiIdCandIdAndBiIdPostId(String submissionStage, Date date, String candId, Integer postId) {
        candPostRepository.updateSubmissionStageAndSubmissionDateByBiIdCandIdAndBiIdPostId(submissionStage, date, candId, postId);
    }
    public List<CandPost> getCandPostBySubmissionStageIsNot(String submissionStage){
        return candPostRepository.findBySubmissionStageIsNot(submissionStage);
    }
    public void insertCandPost(String candId, Integer postId, Date submissionDate, String submissionStage){
        CandPost candPost = new CandPost();
        CandPostPK candPostPK = new CandPostPK();
        candPostPK.setCandId(candId);
        candPostPK.setPostId(postId);
        candPost.setBiId(candPostPK);
        candPost.setSubmissionDate(submissionDate);
        candPost.setSubmissionStage(submissionStage);
        candPostRepository.save(candPost);
    }
    public List<CandPost> getDeliveredCandPostByCandId(String candId) {
        return candPostRepository.findByCandIdAndExcludeTwoSubmissionStages(candId, "邀请", "流程终止");
    }
    public void deleteCandPostByCandIdAndPostId(String candId, Integer postId) {
        candPostRepository.deleteByBiIdCandIdAndBiIdPostId(candId, postId);
    }
    public void save(CandPost candPost) {
        candPostRepository.save(candPost);
    }
}
