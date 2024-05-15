package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Candidate;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

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

    Map<String, Object> getCandInfoByCandId(String id);

    void editCandidateInfo(String id, Map<String, Object> values, List<Integer> deletedProjects);

    Map<String, Object> changePassword(String id, String oldPassword, String newPassword);

    Map<String, Object> deleteAccount(String id, String candidateId, String password);
}
