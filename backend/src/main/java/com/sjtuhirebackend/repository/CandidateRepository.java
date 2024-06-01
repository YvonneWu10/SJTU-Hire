package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Company;
import jakarta.persistence.Column;
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
    List<Candidate> findByCandWorkYearGreaterThanEqual(int candWorkYear);
    List<Candidate> findByCandWorkYearAfter(int candWorkYear);
    List<Candidate> findByCandExpectedSalary(int candExpectedSalary);
    List<Candidate> findByCandExpectedSalaryBetween(int lb, int ub);
    @Query(value = "SELECT u.candId FROM candidate u WHERE u.candName = ?1", nativeQuery = true)
    List<String> findCandIdByCandName(String candName);

    // 根据candId删除求职者
    @Transactional
    void deleteByCandId(String candId);

    // 返回所有token
    @Query("SELECT c.candToken FROM Candidate c")
    List<String> findAllToken();

    //返回所有涉及应聘者的专业
    @Query("SELECT DISTINCT p.candMajor FROM Candidate p")
    List<String> findDistinctMajor();

    //返回所有涉及应聘者的大学
    @Query("SELECT DISTINCT p.candUniversity FROM Candidate p")
    List<String> findDistinctUniversity();

    //返回应聘者的年龄段聚类
    @Query("SELECT " +
            "CASE " +
            "WHEN c.candAge < 20 THEN '<20岁' " +
            "WHEN c.candAge BETWEEN 21 AND 30 THEN '21-30岁' " +
            "WHEN c.candAge BETWEEN 31 AND 40 THEN '31-40岁' " +
            "WHEN c.candAge BETWEEN 41 AND 50 THEN '41-50岁' " +
            "ELSE '>51岁' END AS ageRange, " +
            "COUNT(c) AS count " +
            "FROM Candidate c " +
            "GROUP BY ageRange")
    List<Object[]> countCandidatesByAgeRange();

    //返回应聘者的学历聚类
    @Query(value = "SELECT candDegree as name, COUNT(*) as value FROM candidate c GROUP BY candDegree", nativeQuery = true)
    List<Object[]> countCandidatesByDegree();

    //返回应聘者的薪水聚类
    @Query("SELECT CASE " +
            "WHEN c.candExpectedSalary < 10 THEN '<10' " +
            "WHEN c.candExpectedSalary BETWEEN 11 AND 20 THEN '11-20' " +
            "WHEN c.candExpectedSalary BETWEEN 21 AND 30 THEN '21-30' " +
            "WHEN c.candExpectedSalary BETWEEN 31 AND 40 THEN '31-40' " +
            "WHEN c.candExpectedSalary BETWEEN 41 AND 50 THEN '41-50' " +
            "WHEN c.candExpectedSalary BETWEEN 51 AND 60 THEN '51-60' " +
            "ELSE '>61' END AS name, COUNT(c) AS value, 'required' AS type " +
            "FROM Candidate c " +
            "GROUP BY name")
    List<Object[]> findSalaryExpectationsByCandidate();

}
