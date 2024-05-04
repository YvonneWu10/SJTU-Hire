package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.CandidateDao;
import com.sjtuhirebackend.dao.ProjectDao;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Project;
import com.sjtuhirebackend.service.CandidateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Scope("prototype")
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    private CandidateDao candidateDao;
    @Autowired
    private ProjectDao projectDao;

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

    public Map<String, Object> getCandInfoByCandId(String id) {
        Candidate candidate = candidateDao.getCandidateByCandId(id);
        List<Project> projects = projectDao.getProjectByCandId(id);

        Map<String, Object> ans = new HashMap<>();
        ans.put("candidate", candidate);
        ans.put("projects", projects);

        return ans;
    }
}
