package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.*;

import com.sjtuhirebackend.entity.*;

import com.sjtuhirebackend.entity.CandPost;
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

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
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
    private ProjectDao projectDao;
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
        List<Project> projectList = projectDao.getProjectByCandId(candId);
        Map<String,Object> ans = new HashMap<>();
        //调用put()方法增添数据
        ans.put("candPost", candPost);
        ans.put("candInfo", cand);
        ans.put("postInfo", post);
        ans.put("projectInfo", projectList);
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
    public Map<String,Object> getCandPostInfoByHRId(int hrId){
        List<Integer> responsiblePostId = postDao.getPostIdByHRId(hrId);
        // return all candpost given post id
        List<CandPost> responsibleRecords = candPostDao.getCandPostByPostIdIn(responsiblePostId);
        List<CandPost> validRecords = candPostDao.getCandPostBySubmissionStageIsNot("邀请");
        responsibleRecords.retainAll(validRecords);
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

    public List<CandPost> getCandPostByCandIdInAndPostId(List<String> candIds, Integer postId){
        return candPostDao.getCandPostByCandIdInAndPostId(candIds, postId);
    }
    public List<CandPost> getCandPostByHRId(int hrId){
        List<Integer> responsiblePostId = postDao.getPostIdByHRId(hrId);
        // return all candpost given post id
        return candPostDao.getCandPostByPostIdIn(responsiblePostId);
    }
    public List<CandPost> getCandPostByCandIdIn(List<String> candIds){
        return candPostDao.getCandPostByCandIdIn(candIds);
    }

    public List<CandPost> getCandPostByPostIdIn(List<Integer> postIds){
        return candPostDao.getCandPostByPostIdIn(postIds);
    }

    public void forwardSubmissionStageByCandIdAndPostId(String candId, Integer postId){
        CandPost candPost = candPostDao.getCandPostByCandIdAndPostId(candId, postId);
        Map<String, String> map = new HashMap<>();
        map.put("简历", "笔试");
        map.put("笔试", "一面");
        map.put("一面", "二面");
        map.put("二面", "hr面");
        map.put("hr面", "offer评估");
        map.put("offer评估", "录取");
        candPostDao.updateSubmissionStageByBiIdCandIdAndBiIdPostId(map.get(candPost.getSubmissionStage()), candId, postId);
    }

    public void terminateSubmissionStageByCandIdAndPostId(String candId, Integer postId){
        candPostDao.updateSubmissionStageByBiIdCandIdAndBiIdPostId("流程终止", candId, postId);
    }
    public List<CandPost> getCandPostBySubmissionStageIsNot(String submissionStage){
        return candPostDao.getCandPostBySubmissionStageIsNot(submissionStage);
    }

    public void insertCandPostByInvitation(String candId, Integer postId) {
        candPostDao.insertCandPost(candId, postId, Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()), "邀请");
    }

    public void insertCandPostByDelivery(String candId, Integer postId) {
        CandPost candPost = new CandPost();
        CandPostPK candPostPK = new CandPostPK();
        candPostPK.setCandId(candId);
        candPostPK.setPostId(postId);
        candPost.setBiId(candPostPK);
        candPost.setSubmissionDate(new Date());
        candPost.setSubmissionStage("简历");
        candPostDao.save(candPost);
    }

    public Map<String, Object> getCandPostByCandIdAndSubmissionStage(String candId, String stage) {
        List<CandPost> candPostList = candPostDao.getCandPostByCandIdAndSubmissionStage(candId, stage);

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

        List<Boolean> timeout = new ArrayList<>();
        Date current = new Date();
        for (Post post : postList) {
            timeout.add(post.getOpenDate().after(current) || post.getEndDate().before(current));
        }

        Map<String, Object> ans = new HashMap<>();
        ans.put("candPosts", candPostList);
        ans.put("posts", postList);
        ans.put("companies", companyNameList);
        ans.put("timeout", timeout);

        return ans;
    }

    public void acceptInvitationByCandIdAndPostId(String candId, Integer postId) {
        Date current = new Date();
        candPostDao.updateSubmissionStageAndSubmissionDateByBiIdCandIdAndBiIdPostId("简历", current, candId, postId);
    }

    public void refuseInvitationByCandIdAndPostId(String candId, Integer postId) {
        candPostDao.deleteCandPostByCandIdAndPostId(candId, postId);
    }
    public Map<String, Object> getDeliveredCandPostDetailByCandId(String candidateId) {
        List<CandPost> candPostList = candPostDao.getDeliveredCandPostByCandId(candidateId);

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
