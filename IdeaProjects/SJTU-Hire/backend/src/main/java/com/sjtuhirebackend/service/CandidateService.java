package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Candidate;

import java.util.List;

public interface CandidateService {
    String getCandNameByCandId(String id);

    List<Candidate> getCandidates();

    Candidate getCandidatesByCandId(String candId);

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

    List<String> getDistinctCandMajors();

    List<String> getDistinctCandUniversities();

    void deleteCandidate(String candId);

    long candidateCount();

    List<Object[]> countCandidatesByAgeRange();

    List<Object[]> countCandidatesByDegree();

    List<Object[]> findSalaryExpectationsByCandidate();
}
