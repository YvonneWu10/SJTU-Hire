package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Company;
import jakarta.persistence.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, String> {
    Candidate findByCandId(String candId);
    Candidate findByCandToken(String candToken);
    List<Candidate> findByCandIdIn(List<String> candIds);
    List<Candidate> findByCandName(String candName);
    List<Candidate> findByCandNameContaining(String candName);
    List<Candidate> findByCandAge(int candAge);
    List<Candidate> findByCandGender(String candGender);
    Candidate findByCandPhone(String candPhone);
    Candidate findByCandMail(String candMail);
    List<Candidate> findByCandProvince(String candProvince);
    List<Candidate> findByCandMentor(String candMentor);
    List<Candidate> findByCandPaperNum(int candPaperNum);
    List<Candidate> findByCandDegree(String candDegree);
    List<Candidate> findByCandUniversity(String candUniversity);
    List<Candidate> findByCandMajor(String candMajor);
    List<Candidate> findByCandWorkYear(int candWorkYear);
    List<Candidate> findByCandWorkYearAfter(int candWorkYear);
    List<Candidate> findByCandExpectedSalary(int candExpectedSalary);
    List<Candidate> findByCandExpectedSalaryBetween(int lb, int ub);

    //返回所有涉及应聘者的专业
    @Query("SELECT DISTINCT p.candMajor FROM Candidate p")
    List<String> findDistinctMajor();

    //返回所有涉及应聘者的大学
    @Query("SELECT DISTINCT p.candUniversity FROM Candidate p")
    List<String> findDistinctUniversity();
}
