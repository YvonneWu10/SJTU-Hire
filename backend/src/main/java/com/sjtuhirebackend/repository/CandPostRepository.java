package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    List<CandPost> findByBiIdCandIdAndSubmissionStage(String candId, String stage);
    List<CandPost> findByBiIdCandIdInAndBiIdPostId(List<String> candIds, Integer postId);
    List<CandPost> findByBiIdCandIdIn(List<String> candIds);
    List<CandPost> findBySubmissionStage(String submissionStage);

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
    @Query(value = "SELECT * FROM cand_post cp WHERE cp.candId = ?1 AND cp.submissionStage <> ?2 AND cp.submissionStage <> ?3 AND cp.submissionStage <> ?4", nativeQuery = true)
    List<CandPost> findByCandIdAndExcludeThreeSubmissionStages(String candId, String stage1, String stage2, String stage3);

    // 删除candId postId对应的投递记录
    @Transactional
    void deleteByBiIdCandIdAndBiIdPostId(String candId, Integer postId);

    @Query(value = "SELECT * FROM cand_post p LIMIT :startIndex, :pageSize", nativeQuery = true)
    List<CandPost> findByPages(@Param("startIndex") int startIndex, @Param("pageSize") int pageSize);

    // 获取postId不同的投递个数（即被投递的岗位数）
    @Query(value="SELECT COUNT(DISTINCT postId) FROM cand_post", nativeQuery = true)
    Integer countPosts();

    // 获取热度的前rank个岗位
    @Query(value = "SELECT p.postId, COUNT(p.postId) FROM cand_post p GROUP BY p.postId ORDER BY COUNT(p.postId) DESC LIMIT :rank ", nativeQuery = true)
    List<Object[]> getHotJobId(@Param("rank") int rank);
}
