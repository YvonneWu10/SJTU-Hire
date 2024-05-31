package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Candidate;

import java.util.List;


public interface CandidateDao {
    // 通过candId获取求职者
    Candidate getCandidateByCandId(String candidateId);
    // 通过candToken获取求职者
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
    // 保存求职者
    void saveCandidate(Candidate candidate);

    // 删除求职者
    void deleteCandidateById(String candidateId);

    // 判断是否存在当前的token
    boolean existToken(String token);
}
