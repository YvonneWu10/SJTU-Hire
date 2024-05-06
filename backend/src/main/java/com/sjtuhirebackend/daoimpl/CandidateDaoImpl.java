package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.CandidateDao;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.repository.CandidateRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.List;

@Repository
@Slf4j
public class CandidateDaoImpl implements CandidateDao {
    @Autowired
    private CandidateRepository candidateRepository;

    public Candidate getCandidateByCandId(String candidateId) { return candidateRepository.findByCandId(candidateId); }
    public Candidate getCandidateByCandToken(String candidateToken) { return candidateRepository.findByCandToken(candidateToken); }


    public List<Candidate> getCandidates(){
        return candidateRepository.findAll();
    }

    public List<Candidate> getCandidatesByCandIdList(List<String> candIds) {
        return candidateRepository.findByCandIdIn(candIds);
    }

    public List<Candidate> getCandidatesByCandName(String candName){
        return candidateRepository.findByCandName(candName);
    }
    public List<Candidate> getCandidatesByCandAge(int candAge){
        return candidateRepository.findByCandAge(candAge);
    }
    public List<Candidate> getCandidatesByCandGender(String candGender){
        return candidateRepository.findByCandGender(candGender);
    }
    public Candidate getCandidatesByCandPhone(String candPhone){
        return candidateRepository.findByCandPhone(candPhone);
    }
    public Candidate getCandidatesByCandMail(String candMail){
        return candidateRepository.findByCandMail(candMail);
    }
    public List<Candidate> getCandidatesByCandProvince(String candProvince){
        return candidateRepository.findByCandProvince(candProvince);
    }
    public List<Candidate> getCandidatesByCandMentor(String candMentor){
        return candidateRepository.findByCandMentor(candMentor);
    }
    public List<Candidate> getCandidatesByCandPaperNum(int candPaperNum){
        return candidateRepository.findByCandPaperNum(candPaperNum);
    }
    public List<Candidate> getCandidatesByCandDegree(String candDegree){
        return candidateRepository.findByCandDegree(candDegree);
    }
    public List<Candidate> getCandidatesByCandUniversity(String candUniversity){
        return candidateRepository.findByCandUniversity(candUniversity);
    }
    public List<Candidate> getCandidatesByCandMajor(String candMajor){
        return candidateRepository.findByCandMajor(candMajor);
    }
    public List<Candidate> getCandidatesByCandWorkYear(int candWorkYear){
        return candidateRepository.findByCandWorkYear(candWorkYear);
    }
    public List<Candidate> getCandidatesByCandWorkYearAfter(int candWorkYear){
        return candidateRepository.findByCandWorkYearGreaterThanEqual(candWorkYear);
    }
    public List<Candidate> getCandidatesByCandExpectedSalary(int candExpectedSalary){
        return candidateRepository.findByCandExpectedSalary(candExpectedSalary);
    }
    public List<Candidate> getCandidatesByCandExpectedSalaryBetween(int lb, int ub){
        return candidateRepository.findByCandExpectedSalaryBetween(lb, ub);
    }
    public List<Candidate> getCandidateByCandIdNotIn(List<String> candIds){
        return candidateRepository.findByCandIdNotIn(candIds);
    }
    public List<String> getCandIdByCandName(String candName){
        return candidateRepository.findCandIdByCandName(candName);
    }


}
