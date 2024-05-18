package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Candidate;

import java.util.List;


public interface CandidateDao {
    Candidate getCandidateByCandId(String candidateId);
    Candidate getCandidateByCandToken(String candidateToken);
    List<Candidate> getCandidates();
    List<Candidate> getCandidatesByCandIdList(List<String> candIds);
    List<Candidate> getCandidatesByCandName(String candName);
    List<Candidate> getCandidatesByCandAge(int candAge);
    List<Candidate> getCandidatesByCandGender(String candGender);
    Candidate getCandidatesByCandPhone(String candPhone);
    Candidate getCandidatesByCandMail(String candMail);
    List<Candidate> getCandidatesByCandProvince(String candProvince);
    List<Candidate> getCandidatesByCandMentor(String candMentor);
    List<Candidate> getCandidatesByCandPaperNum(int candPaperNum);
    List<Candidate> getCandidatesByCandDegree(String candDegree);
    List<Candidate> getCandidatesByCandUniversity(String candUniversity);
    List<Candidate> getCandidatesByCandMajor(String candMajor);
    List<Candidate> getCandidatesByCandWorkYear(int candWorkYear);
    List<Candidate> getCandidatesByCandWorkYearAfter(int candWorkYear);
    List<Candidate> getCandidatesByCandExpectedSalary(int candExpectedSalary);
    List<Candidate> getCandidatesByCandExpectedSalaryBetween(int lb, int ub);
    List<Candidate> getCandidateByCandIdNotIn(List<String> candIds);
    List<String> getCandIdByCandName(String candName);

    void saveCandidate(Candidate candidate);
}
