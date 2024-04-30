package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.CandPostDao;
import com.sjtuhirebackend.entity.CandPost;
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
}
