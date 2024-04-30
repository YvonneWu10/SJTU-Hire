package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.CandPostDao;
import com.sjtuhirebackend.dao.CandidateDao;
import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.service.CandidateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Scope("prototype")
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    private CandidateDao candidateDao;
    @Autowired
    private PostDao postDao;
    @Autowired
    private CandPostDao candPostDao;

    public String getCandNameByCandId(String id) {
        Candidate res = candidateDao.getCandidateByCandId(id);
        if (res != null) {
            return res.getCandName();
        }
        return null;
    }

    public List<Candidate> getCandidates(){
        return candidateDao.getCandidates();
    }
    public Candidate getCandidatesByCandId(String candId){
        return candidateDao.getCandidateByCandId(candId);
    }
    public List<Candidate> getCandidatesByCandName(String candName){
        return candidateDao.getCandidatesByCandName(candName);
    }
    public List<Candidate> getCandidatesByCandAge(int candAge){
        return candidateDao.getCandidatesByCandAge(candAge);
    }
    public List<Candidate> getCandidatesByCandGender(String candGender){
        return candidateDao.getCandidatesByCandGender(candGender);
    }
    public Candidate getCandidatesByCandPhone(String candPhone){
        return candidateDao.getCandidatesByCandPhone(candPhone);
    }
    public Candidate getCandidatesByCandMail(String candMail){
        return candidateDao.getCandidatesByCandMail(candMail);
    }
    public List<Candidate> getCandidatesByCandProvince(String candProvince){
        return candidateDao.getCandidatesByCandProvince(candProvince);
    }
    public List<Candidate> getCandidatesByCandMentor(String candMentor){
        return candidateDao.getCandidatesByCandMentor(candMentor);
    }
    public List<Candidate> getCandidatesByCandPaperNum(int candPaperNum){
        return candidateDao.getCandidatesByCandPaperNum(candPaperNum);
    }
    public List<Candidate> getCandidatesByCandDegree(String candDegree){
        return candidateDao.getCandidatesByCandDegree(candDegree);
    }
    public List<Candidate> getCandidatesByCandUniversity(String candUniversity){
        return candidateDao.getCandidatesByCandUniversity(candUniversity);
    }
    public List<Candidate> getCandidatesByCandMajor(String candMajor){
        return candidateDao.getCandidatesByCandMajor(candMajor);
    }
    public List<Candidate> getCandidatesByCandWorkYear(int candWorkYear){
        return candidateDao.getCandidatesByCandWorkYear(candWorkYear);
    }
    public List<Candidate> getCandidatesByCandWorkYearAfter(int candWorkYear){
        return candidateDao.getCandidatesByCandWorkYearAfter(candWorkYear);
    }
    public List<Candidate> getCandidatesByCandExpectedSalary(int candExpectedSalary){
        return candidateDao.getCandidatesByCandExpectedSalary(candExpectedSalary);
    }
    public List<Candidate> getCandidatesByCandExpectedSalaryBetween(int lb, int ub){
        return candidateDao.getCandidatesByCandExpectedSalaryBetween(lb, ub);
    }
    public List<Candidate> getAllCandidatesAvailable(int HRId){
        List<Integer> responsiblePostId = postDao.getPostIdByHRId(HRId);
        // return all candpost given post id
        List<CandPost> responsibleRecords = candPostDao.getCandPostByPostIdIn(responsiblePostId);
        List<String> candIdList = (responsibleRecords.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getCandId).toList();
        return candidateDao.getCandidateByCandIdNotIn(candIdList);
    }
}
