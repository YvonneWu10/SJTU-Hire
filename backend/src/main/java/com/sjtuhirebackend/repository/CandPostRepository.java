package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import jakarta.persistence.Column;
import org.springframework.data.jpa.repository.JpaRepository;
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
    List<CandPost> findBySubmissionStage(String submissionStage);

    @Query(value = "SELECT * FROM cand_post p LIMIT :startIndex, :pageSize", nativeQuery = true)
    List<CandPost> findByPages(@Param("startIndex") int startIndex, @Param("pageSize") int pageSize);

    // 获取postId不同的投递个数（即被投递的岗位数）
    @Query(value="SELECT COUNT(DISTINCT postId) FROM cand_post", nativeQuery = true)
    Integer countPosts();

    // 获取热度的前rank个岗位
    @Query(value = "SELECT p.postId, COUNT(p.postId) FROM cand_post p GROUP BY p.postId ORDER BY COUNT(p.postId) DESC LIMIT :rank ", nativeQuery = true)
    List<Object[]> getHotJobId(@Param("rank") int rank);
}
