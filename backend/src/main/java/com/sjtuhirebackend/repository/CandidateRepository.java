package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CandidateRepository extends JpaRepository<Candidate, String> {
    Candidate findByCandId(String candId);
    Candidate findByCandToken(String candToken);
    List<Candidate> findByCandIdNotIn(List<String> candIds);
    List<Candidate> findByCandIdIn(List<String> candIds);
    List<Candidate> findByCandName(String candName);
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
    List<Candidate> findByCandWorkYearGreaterThanEqual(int candWorkYear);
    List<Candidate> findByCandExpectedSalary(int candExpectedSalary);
    List<Candidate> findByCandExpectedSalaryBetween(int lb, int ub);
    @Query(value = "SELECT u.candId FROM Candidate u WHERE u.candName = ?1", nativeQuery = true)
    List<String> findCandIdByCandName(String candName);
    List<Candidate> findByCandWorkYearAfter(int candWorkYear);
    // 根据candId删除求职者
    @Transactional
    void deleteByCandId(String candId);

    // 返回所有token
    @Query("SELECT c.candToken FROM Candidate c")
    List<String> findAllToken();
}
