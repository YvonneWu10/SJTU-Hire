package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.dao.CandPostDao;
import com.sjtuhirebackend.dao.CompanyDao;
import com.sjtuhirebackend.dao.DepartmentDao;
import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.Company;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@Scope("prototype")
public class PostServiceImpl implements PostService {
    @Autowired
    private PostDao postDao;
    @Autowired
    private CompanyDao companyDao;
    @Autowired
    private DepartmentDao departmentDao;
    @Autowired
    private CandPostDao candPostDao;

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
    // 删除已有岗位
    public void deletePost(int postId) { postDao.deletePost(postId); }
    // 根据id获取岗位
    public List<Post> getPostsByPostIds(List<Integer> postIds) { return postDao.getPostsByPostIds(postIds); }

    public List<String> getDistinctPostCities() { return postDao.getDistinctPostCities(); }

    public List<Integer> getPostIdByPostNameAndHRId(String postName, Integer HRId){
        return postDao.getPostIdByPostNameAndHRId(postName, HRId);
    }
    public void editPost(Integer postId, String postName, String degreeReq, Integer workYearReq,
                         Integer onSiteDayReq, String city, Date openDate, Date endDate,
                         Integer recruitNum, Integer salary, String workStyle, String workType,
                         String description, String responsibility){
        postDao.editPost(postId, postName, degreeReq, workYearReq,
                onSiteDayReq, city, openDate, endDate,
                recruitNum, salary, workStyle, workType,
                description, responsibility);
    }

    public void createPost(String postName, String degreeReq, Integer workYearReq,
                           Integer onSiteDayReq, String city, Date openDate, Date endDate,
                           Integer recruitNum, Integer salary, String workStyle, String workType,
                           String description, String responsibility, Integer departmentId, Integer companyId,
                           Integer hrId) {
        postDao.createPost(postName, degreeReq, workYearReq,
                onSiteDayReq, city, openDate, endDate,
                recruitNum, salary, workStyle, workType,
                description, responsibility, departmentId, companyId, hrId);
    }

    public Map<String, Object> getPostDetailById(String candId, int postId) {
        Post post = postDao.getPostById(postId);
        Company company = companyDao.getCompany(post.getCompanyId());
        String department = departmentDao.getByCompanyIdAndDepartmentId(post.getCompanyId(), post.getDepartmentId()).getDepartmentName();
        CandPost record = candPostDao.getCandPostByCandIdAndPostId(candId, postId);

        Date current = new Date();
        boolean timeout = post.getOpenDate().after(current) || post.getEndDate().before(current);
        boolean delivered = (record != null && !record.getSubmissionStage().equals("邀请"));
        boolean ended = (record != null && record.getSubmissionStage().equals("流程终止"));
        boolean invited = (record != null && record.getSubmissionStage().equals("邀请"));

        Map<String, Object> ans = new HashMap<>();
        ans.put("post", post);
        ans.put("company", company);
        ans.put("department", department);
        ans.put("timeout", timeout);
        ans.put("delivered", delivered);
        ans.put("ended", ended);
        ans.put("invited", invited);
        return ans;
    }

    public long getPostCount() { return postDao.getPostCount(); }

    public List<Object[]> countPostsBySalaryAndDegree() { return  postDao.countPostsBySalaryAndDegree(); }

    public List<Object[]> findSalaryDistributionByPost() { return postDao.findSalaryDistributionByPost(); }

    public List<Object[]> findRecruitmentByCity() { return postDao.findRecruitmentByCity(); }
}