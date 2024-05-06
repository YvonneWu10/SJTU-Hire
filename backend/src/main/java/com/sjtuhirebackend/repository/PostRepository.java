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
}
