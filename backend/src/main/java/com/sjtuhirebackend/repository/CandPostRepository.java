package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface CandPostRepository extends JpaRepository<CandPost, CandPostPK> {
    CandPost findByBiId(CandPostPK biId);
    CandPost findByBiIdCandIdAndBiIdPostId(String candId, int postId);
    List<CandPost> findByBiIdCandId(String candId);
    List<CandPost> findByBiIdPostId(int postId);
    List<CandPost> findByBiIdPostIdIn(List<Integer> postIds);
    List<CandPost> findBySubmissionDate(Date submissionDate);
    List<CandPost> findBySubmissionDateBefore(Date submissionDate);
    List<CandPost> findBySubmissionDateAfter(Date submissionDate);
    List<CandPost> findBySubmissionDateBetween(Date lb, Date ub);
    List<CandPost> findBySubmissionStage(String submissionStage);
    List<CandPost> findByBiIdCandIdInAndBiIdPostId(List<String> candIds, Integer postId);
    List<CandPost> findByBiIdCandIdIn(List<String> candIds);
    List<CandPost> findByBiIdCandIdAndSubmissionStage(String candId, String stage);

    // 修改candId postId对应的投递记录的投递阶段
    @Transactional
    @Modifying
    @Query(value = "UPDATE cand_post cp SET cp.submissionStage = ?1 WHERE cp.candId = ?2 AND cp.postId = ?3", nativeQuery = true)
    void updateSubmissionStageByBiIdCandIdAndBiIdPostId(String submissionStage, String candId, Integer postId);
    List<CandPost> findBySubmissionStageIsNot(String submissionStage);

    // 修改candId postId对应的投递记录的投递阶段和投递时间
    @Transactional
    @Modifying
    @Query(value = "UPDATE cand_post cp SET cp.submissionStage = ?1, cp.submissionDate = ?2 WHERE cp.candId = ?3 AND cp.postId = ?4", nativeQuery = true)
    void updateSubmissionStageAndSubmissionDateByBiIdCandIdAndBiIdPostId(String submissionStage, Date date, String candId, Integer postId);
    // 根据candId查找投递记录，并排除在stage1或stage2阶段的投递记录
    @Query(value = "SELECT * FROM cand_post cp WHERE cp.candId = ?1 AND cp.submissionStage <> ?2 AND cp.submissionStage <> ?3", nativeQuery = true)
    List<CandPost> findByCandIdAndExcludeTwoSubmissionStages(String candId, String stage1, String stage2);

    // 删除candId postId对应的投递记录
    @Transactional
    void deleteByBiIdCandIdAndBiIdPostId(String candId, Integer postId);
}
