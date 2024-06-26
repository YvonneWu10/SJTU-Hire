package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Post;

import java.util.Date;
import java.util.List;
import java.util.Map;


public interface PostService {
    Post getPostById(int postId);
    // 获取岗位信息
    List<Post> getPosts();
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
    List<Integer> getPostIdByPostNameAndHRId(String postName, Integer HRId);
    void editPost(Integer postId, String postName, String degreeReq, Integer workYearReq,
                  Integer onSiteDayReq, String city, Date openDate, Date endDate,
                  Integer recruitNum, Integer salary, String workStyle, String workType,
                  String description, String responsibility);

    void createPost(String postName, String degreeReq, Integer workYearReq,
                    Integer onSiteDayReq, String city, Date openDate, Date endDate,
                    Integer recruitNum, Integer salary, String workStyle, String workType,
                    String description, String responsibility, Integer departmetnId, Integer companyId,
                    Integer hrId);
    // 删除已有岗位
    void deletePost(int postId);
    List<String> getDistinctPostCities();
    // 获取所有岗位数
    long getPostCount();
    // 根据id获取岗位
    List<Post> getPostsByPostIds(List<Integer> postIds);
    // 根据薪水和学历聚类
    List<Object[]> countPostsBySalaryAndDegree();
    // 根据薪水聚类
    List<Object[]> findSalaryDistributionByPost();
    // 根据城市聚类
    List<Object[]> findRecruitmentByCity();
    // 获取岗位postId的详细信息，和该岗位求职者candId的投递情况
    Map<String, Object> getPostDetailById(String candId, int postId);
}