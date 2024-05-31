package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Slf4j
public class PostDaoImpl implements PostDao {
    @Autowired
    private PostRepository postRepository;

    public Post getPostById(int postId) { return postRepository.findByPostId(postId); }
    // 获取岗位信息
    public List<Post> getPosts() { return postRepository.findAll(); }
    public Post getPostByPostId(int postId){
        return postRepository.findByPostId(postId);
    }
    public List<Post> getPostsByPostIds(List<Integer> postIds){
        return postRepository.findByPostIdIn(postIds);
    }
    // 根据岗位名查找岗位
    public List<Post> getPostByName(String searchPostName) { return postRepository.findByPostNameContaining(searchPostName); }
    // 根据学历要求查找岗位
    public List<Post> getPostByDegree(String searchDegree) { return postRepository.findByDegreeReq(searchDegree); }
    // 根据工作经验查找岗位
    public List<Post> getPostByYearReq(int searchYearReqLow, int searchYearReqHigh) { return postRepository.findByWorkYearReqBetween(searchYearReqLow, searchYearReqHigh); }
    // 根据到岗天数查找岗位
    public List<Post> getPostByDayReq(int searchDayReqLow, int searchDayReqHigh) { return postRepository.findByOnSiteDayReqBetween(searchDayReqLow, searchDayReqHigh); }
    // 根据城市查找岗位
    public List<Post> getPostByCity(String searchCity) { return postRepository.findByCity(searchCity); }
    // 查找在searchBeginDate和searchEndDate之间都可以投递的岗位
    public List<Post> getPostByTime(Date searchBeginDate, Date searchEndDate) {
        List<Post> L1 = postRepository.findByOpenDateLessThanEqual(searchBeginDate);
        List<Post> L2 = postRepository.findByEndDateGreaterThanEqual(searchEndDate);
        return L1.stream().filter(L2::contains).collect(Collectors.toList());
    }
    // 根据招聘人数查找岗位
    public List<Post> getPostByNum(int searchNumLow, int searchNumHigh) { return postRepository.findByRecruitNumBetween(searchNumLow, searchNumHigh); }
    // 根据工资查找岗位
    public List<Post> getPostBySalary(int searchSalaryLow, int searchSalaryHigh) { return postRepository.findBySalaryBetween(searchSalaryLow, searchSalaryHigh); }
    // 根据公司名查找岗位
    public List<Post> getPostByCompany(int searchCompId) { return postRepository.findByCompanyId(searchCompId); }
    // 根据公司名和部门名查找岗位
    public List<Post> getPostByCompDep(int searchCompId, int searchDepId) { return postRepository.findByCompanyIdAndDepartmentId(searchCompId, searchDepId); }
    // 根据远程/线下查找岗位
    public List<Post> getPostByWorkStyle(String searchWorkStyle) { return postRepository.findByWorkStyle(searchWorkStyle); }
    // 根据实习/正式查找岗位
    public List<Post> getPostByWorkType(String searchWorkType) { return postRepository.findByWorkType(searchWorkType); }
    public List<Post> getPostByHRId(int hrId){
        return postRepository.findByHRId(hrId);
    }
    public List<Integer> getPostIdByHRId(int hrId){
        return postRepository.findByHRIdForPostId(hrId);
    }
    // 添加新岗位
    public void createPost(String postName, String degreeReq, Integer workYearReq,
                         Integer onSiteDayReq, String city, Date openDate, Date endDate,
                         Integer recruitNum, Integer salary, String workStyle, String workType,
                         String description, String responsibility, Integer departmentId, Integer companyId,
                           Integer hrId){
        Post post = new Post();
        post.setPostName(postName);
        post.setDegreeReq(degreeReq);
        post.setWorkYearReq(workYearReq);
        post.setOnSiteDayReq(onSiteDayReq);
        post.setCity(city);
        post.setOpenDate(openDate);
        post.setEndDate(endDate);
        post.setRecruitNum(recruitNum);
        post.setSalary(salary);
        post.setWorkStyle(workStyle);
        post.setWorkType(workType);
        post.setDescription(description);
        post.setResponsibility(responsibility);
        post.setDepartmentId(departmentId);
        post.setCompanyId(companyId);
        post.setHRId(hrId);
        System.out.println(hrId);
        postRepository.save(post);
    }
    public void createPost(Post post) { postRepository.save(post); }
    // 删除已有岗位
    public void deletePost(int postId) { postRepository.deleteById(postId); }

    public List<String> getDistinctPostCities() { return postRepository.findDistinctCity(); }
    public List<Integer> getPostIdByPostNameAndHRId(String postName, Integer HRId){
        return postRepository.findPostIdByPostNameAndHRId(postName, HRId);
    }
    public void editPost(Integer postId, String postName, String degreeReq, Integer workYearReq,
                         Integer onSiteDayReq, String city, Date openDate, Date endDate,
                         Integer recruitNum, Integer salary, String workStyle, String workType,
                         String description, String responsibility){
        Post post = postRepository.findByPostId(postId);
        post.setPostName(postName);
        post.setDegreeReq(degreeReq);
        post.setWorkYearReq(workYearReq);
        post.setOnSiteDayReq(onSiteDayReq);
        post.setCity(city);
        post.setOpenDate(openDate);
        post.setEndDate(endDate);
        post.setRecruitNum(recruitNum);
        post.setSalary(salary);
        post.setWorkStyle(workStyle);
        post.setWorkType(workType);
        post.setDescription(description);
        post.setResponsibility(responsibility);
        postRepository.save(post);
    }
}