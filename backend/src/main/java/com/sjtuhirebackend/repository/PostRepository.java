package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    Post findByPostId(int postId);
    List<Post> findByPostIdIn(List<Integer> postIds);
    List<Post> findByPostNameContaining(String postName);
    List<Post> findByDegreeReq(String degreeReq);
    List<Post> findByWorkYearReqBetween(int yearReqLow, int yearReqHigh);
    List<Post> findByOnSiteDayReqBetween(int dayReqLow, int dayReqHigh);
    List<Post> findByCity(String city);
    // 查找在openDate前就已开放的岗位
    List<Post> findByOpenDateLessThanEqual(Date openDate);
    // 查找在endDate时还未截止的岗位
    List<Post> findByEndDateGreaterThanEqual(Date endDate);
    List<Post> findByRecruitNumBetween(int recruitNumLow, int recruitNumHigh);
    List<Post> findBySalaryBetween(int salaryLow, int salaryHigh);
    List<Post> findByCompanyId(int companyId);
    List<Post> findByCompanyIdAndDepartmentId(int companyId, int departmentId);
    List<Post> findByWorkStyle(String workStype);
    List<Post> findByWorkType(String workType);

    List<Post> findByHRId(int hrID);
    @Query(value = "SELECT u.postId FROM Post u WHERE u.HRId = ?1", nativeQuery = true)
    List<Integer> findByHRIdForPostId(int hrid);

    // 返回所有岗位涉及的城市
    @Query("SELECT DISTINCT p.city FROM Post p")
    List<String> findDistinctCity();

    @Query("SELECT p.postId FROM Post p WHERE p.postName = ?1 AND p.HRId = ?2")
    List<Integer> findPostIdByPostNameAndHRId(String postName, Integer HRId);

    // 返回岗位关于工资和学历的聚类
    @Query(value = "SELECT " +
            "CASE " +
            "WHEN salary < 10 THEN '<10' " +
            "WHEN salary BETWEEN 11 AND 20 THEN '11-20' " +
            "WHEN salary BETWEEN 21 AND 30 THEN '21-30' " +
            "WHEN salary BETWEEN 31 AND 40 THEN '31-40' " +
            "WHEN salary BETWEEN 41 AND 50 THEN '41-50' " +
            "WHEN salary BETWEEN 51 AND 60 THEN '51-60' " +
            "ELSE '>61' END AS name, " +
            "SUM(recruitNum) AS value, " +
            "degreeReq AS type " +
            "FROM post " +
            "GROUP BY name, type", nativeQuery = true)
    List<Object[]> countPostsBySalaryAndDegree();

    // 返回关于工资的聚类
    @Query("SELECT CASE " +
            "WHEN p.salary < 10 THEN '<10' " +
            "WHEN p.salary BETWEEN 11 AND 20 THEN '11-20' " +
            "WHEN p.salary BETWEEN 21 AND 30 THEN '21-30' " +
            "WHEN p.salary BETWEEN 31 AND 40 THEN '31-40' " +
            "WHEN p.salary BETWEEN 41 AND 50 THEN '41-50' " +
            "WHEN p.salary BETWEEN 51 AND 60 THEN '51-60' " +
            "ELSE '>61' END AS name, SUM(p.recruitNum) AS value, 'given' AS type " +
            "FROM Post p " +
            "GROUP BY name")
    List<Object[]> findSalaryDistributionByPost();

    // 返回关于城市的聚类
    @Query("SELECT p.city, SUM(p.recruitNum) as value FROM Post p GROUP BY p.city")
    List<Object[]> findRecruitmentByCity();
}
