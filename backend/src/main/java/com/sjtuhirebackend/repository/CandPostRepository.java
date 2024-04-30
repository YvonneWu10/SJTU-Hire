package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import jakarta.persistence.Column;
import org.springframework.data.jpa.repository.JpaRepository;

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
}
