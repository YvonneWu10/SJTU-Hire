package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.*;

import com.sjtuhirebackend.entity.CandPost;

import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.dao.CandidateDao;
import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.entity.CandPost;

import com.sjtuhirebackend.service.CandPostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import java.util.Date;
import java.util.List;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Service
@Slf4j
@Scope("prototype")
public class CandPostServiceImpl implements CandPostService {
    @Autowired
    private CandPostDao candPostDao;
    @Autowired
    private PostDao postDao;
    @Autowired
    private CandidateDao candidateDao;
    @Autowired
    private CompanyDao companyDao;

    public List<CandPost> getAllCandPosts(){
        return candPostDao.getAllCandPosts();
    }

    public CandPost getCandPostByCandIdAndPostId(String candId, int postId){
        return candPostDao.getCandPostByCandIdAndPostId(candId, postId);
    }
    public Map<String,Object> getCandPostDetailByCandIdAndPostId(String candId, int postId){
        // return candidate list given candID list
        Candidate cand = candidateDao.getCandidateByCandId(candId);
        Post post = postDao.getPostByPostId(postId);
        CandPost candPost = candPostDao.getCandPostByCandIdAndPostId(candId, postId);
        Map<String,Object> ans = new HashMap<>();
        //调用put()方法增添数据
        ans.put("candPost", candPost);
        ans.put("candInfo", cand);
        ans.put("postInfo", post);
        return ans;
    }
    public List<CandPost> getCandPostByCandId(String candId){
        return candPostDao.getCandPostByCandId(candId);
    }
    public List<CandPost> getCandPostByPostId(int postId){
        return candPostDao.getCandPostByPostId(postId);
    }
    public List<CandPost> getCandPostBySubmissionDate(Date submissionDate){
        return candPostDao.getCandPostBySubmissionDate(submissionDate);
    }
    public List<CandPost> getCandPostBySubmissionDateBefore(Date submissionDate){
        return candPostDao.getCandPostBySubmissionDateBefore(submissionDate);
    }
    public List<CandPost> getCandPostBySubmissionDateAfter(Date submissionDate){
        return candPostDao.getCandPostBySubmissionDateAfter(submissionDate);
    }
    public List<CandPost> getCandPostBySubmissionDateBetween(Date lb, Date ub){
        return candPostDao.getCandPostBySubmissionDateBetween(lb, ub);
    }
    public List<CandPost> getCandPostBySubmissionStage(String submissionStage){
        return candPostDao.getCandPostBySubmissionStage(submissionStage);
    }
    public Map<String,Object> getCandPostByHRId(int hrId){
        List<Integer> responsiblePostId = postDao.getPostIdByHRId(hrId);
        // return all candpost given post id
        List<CandPost> responsibleRecords = candPostDao.getCandPostByPostIdIn(responsiblePostId);
        List<String> candIdList = (responsibleRecords.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getCandId).toList();
        List<Integer> postIdList = (responsibleRecords.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getPostId).toList();
        // return candidate list given candID list
        List<Candidate> candList = new ArrayList<>();
        for (String candId: candIdList){
            candList.add(candidateDao.getCandidateByCandId(candId));
        }
        List<Post> postList = new ArrayList<>();
        for (int postId: postIdList){
            postList.add(postDao.getPostByPostId(postId));
        }
        Map<String,Object> ans = new HashMap<>();
        //调用put()方法增添数据
        ans.put("candPost", responsibleRecords);
        ans.put("candInfo", candList);
        ans.put("postInfo", postList);

        return ans;
    }

    public Map<String, Object> getCandPostDetailByCandId(String candidateId) {
        List<CandPost> candPostList = candPostDao.getCandPostByCandId(candidateId);

        List<Integer> postIdList = (candPostList.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getPostId).toList();
        List<Post> postList = new ArrayList<>();
        for (int postId: postIdList){
            postList.add(postDao.getPostByPostId(postId));
        }

        List<Integer> companyIdList = (postList.stream().map(Post::getCompanyId).toList());
        List<String> companyNameList = new ArrayList<>();
        for (int companyId: companyIdList){
            companyNameList.add(companyDao.getCompany(companyId).getCompanyName());
        }

        Map<String, Object> ans = new HashMap<>();
        ans.put("candPosts", candPostList);
        ans.put("posts", postList);
        ans.put("companies", companyNameList);

        return ans;
    }
}
