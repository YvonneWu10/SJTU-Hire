package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
@Scope("prototype")
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDao postDao;

    public Post getPostById(int postId) { return postDao.getPostById(postId); }
    // 获取岗位信息
    public List<Post> getPosts() { return postDao.getPosts(); }
    // 根据岗位名查找岗位
    public List<Post> getPostByName(String searchPostName) { return postDao.getPostByName(searchPostName); }
    // 根据学历要求查找岗位
    public List<Post> getPostByDegree(String searchDegree) { return postDao.getPostByDegree(searchDegree); }
    // 根据工作经验查找岗位
    public List<Post> getPostByYearReq(int searchYearReqLow, int searchYearReqHigh) { return postDao.getPostByYearReq(searchYearReqLow, searchYearReqHigh); }
    // 根据到岗天数查找岗位
    public List<Post> getPostByDayReq(int searchDayReqLow, int searchDayReqHigh) { return postDao.getPostByDayReq(searchDayReqLow, searchDayReqHigh); }
    // 根据城市查找岗位
    public List<Post> getPostByCity(String searchCity) { return postDao.getPostByCity(searchCity); }
    // 查找在searchBeginDate和searchEndDate之间都可以投递的岗位
    public List<Post> getPostByTime(Date searchBeginDate, Date searchEndDate) { return postDao.getPostByTime(searchBeginDate, searchEndDate); }
    // 根据招聘人数查找岗位
    public List<Post> getPostByNum(int searchNumLow, int searchNumHigh) { return postDao.getPostByNum(searchNumLow, searchNumHigh); }
    // 根据工资查找岗位
    public List<Post> getPostBySalary(int searchSalaryLow, int searchSalaryHigh) { return postDao.getPostBySalary(searchSalaryLow, searchSalaryHigh); }
    // 根据公司名查找岗位
    public List<Post> getPostByCompany(int searchCompId) { return postDao.getPostByCompany(searchCompId); }
    // 根据公司名和部门名查找岗位
    public List<Post> getPostByCompDep(int searchCompId, int searchDepId) { return postDao.getPostByCompDep(searchCompId, searchDepId); }
    // 根据远程/线下查找岗位
    public List<Post> getPostByWorkStyle(String searchWorkStyle) { return postDao.getPostByWorkStyle(searchWorkStyle); }
    // 根据实习/正式查找岗位
    public List<Post> getPostByWorkType(String searchWorkType) { return postDao.getPostByWorkType(searchWorkType); }
    public List<Post> getPostByHRId(int hrId){
        return postDao.getPostByHRId(hrId);
    }
    public List<Integer> getPostIdByHRId(int hrId){
        return postDao.getPostIdByHRId(hrId);
    }
    // 添加新岗位
    public void createPost(Post post) { postDao.createPost(post); }
    // 删除已有岗位
    public void deletePost(int postId) { postDao.deletePost(postId); }

    public List<String> getDistinctPostCities() { return postDao.getDistinctPostCities(); }
    public List<Integer> getPostIdByPostNameAndHRId(String postName, Integer HRId){
        return postDao.getPostIdByPostNameAndHRId(postName, HRId);
    }
}