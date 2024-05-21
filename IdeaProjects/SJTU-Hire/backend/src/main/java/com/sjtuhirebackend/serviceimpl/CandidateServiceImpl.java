package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.CandidateDao;
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
        return candidateDao.getCandidatesByCandNameContaining(candName);
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
    public List<String> getDistinctCandMajors(){
        return candidateDao.getDistinctCandMajors();
    }
    public List<String> getDistinctCandUniversities(){
        return candidateDao.getDistinctUniversities();
    }

    public void deleteCandidate(String candId) {
        candidateDao.deleteCandidate(candId);
    }

    public long candidateCount() {
        return candidateDao.candidateCount();
    }

    public List<Object[]> countCandidatesByAgeRange() {return candidateDao.countCandidatesByAgeRange();}

    public List<Object[]> countCandidatesByDegree() {return candidateDao.countCandidatesByDegree();}

    public List<Object[]> findSalaryExpectationsByCandidate() {return candidateDao.findSalaryExpectationsByCandidate(); }
}
