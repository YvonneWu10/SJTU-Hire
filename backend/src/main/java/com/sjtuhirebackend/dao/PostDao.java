package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Post;

import java.util.Date;
import java.util.List;


public interface PostDao {
    Post getPostById(int postId);
    // 获取岗位信息
    List<Post> getPosts();
    Post getPostByPostId(int postId);
    List<Post> getPostsByPostIds(List<Integer> postIds);
    // 根据岗位名查找岗位
    List<Post> getPostByName(String searchPostName);
    // 根据学历要求查找岗位
    List<Post> getPostByDegree(String searchDegree);
    // 根据工作经验查找岗位
    List<Post> getPostByYearReq(int searchYearReqLow, int searchYearReqHigh);
    // 根据到岗天数查找岗位
    List<Post> getPostByDayReq(int searchDayReqLow, int searchDayReqHigh);
    // 根据城市查找岗位
    List<Post> getPostByCity(String searchCity);
    // 查找在searchBeginDate和searchEndDate之间都可以投递的岗位
    List<Post> getPostByTime(Date searchBeginDate, Date searchEndDate);
    // 根据招聘人数查找岗位
    List<Post> getPostByNum(int searchNumLow, int searchNumHigh);
    // 根据工资查找岗位
    List<Post> getPostBySalary(int searchSalaryLow, int searchSalaryHigh);
    // 根据公司名查找岗位
    List<Post> getPostByCompany(int searchCompId);
    // 根据公司名和部门名查找岗位
    List<Post> getPostByCompDep(int searchCompId, int searchDepId);
    // 根据远程/线下查找岗位
    List<Post> getPostByWorkStyle(String searchWorkStyle);
    // 根据实习/正式查找岗位
    List<Post> getPostByWorkType(String searchWorkType);
    List<Post> getPostByHRId(int hrId);
    List<Integer> getPostIdByHRId(int hrId);
    // 添加新岗位
    void createPost(String postName, String degreeReq, Integer workYearReq,
                    Integer onSiteDayReq, String city, Date openDate, Date endDate,
                    Integer recruitNum, Integer salary, String workStyle, String workType,
                    String description, String responsibility, Integer departmentId,
                    Integer companyId, Integer hrId);
    List<Integer> getPostIdByPostNameAndHRId(String postName, Integer HRId);
    void editPost(Integer postId, String postName, String degreeReq, Integer workYearReq,
                  Integer onSiteDayReq, String city, Date openDate, Date endDate,
                  Integer recruitNum, Integer salary, String workStyle, String workType,
                  String description, String responsibility);
    // 删除已有岗位
    void deletePost(int postId);

    List<String> getDistinctPostCities();

    long getPostCount();

    List<Object[]> countPostsBySalaryAndDegree();

    List<Object[]> findSalaryDistributionByPost();

    List<Object[]> findRecruitmentByCity();
}