package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.*;
import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Slf4j
public class HRController {
    @Autowired
    private CandPostService candPostService;

    @Autowired
    private HRService hrService;

    @Autowired
    private PostService postService;

    @Autowired
    private AuthService authService;

    @Autowired
    private CandidateService candidateService;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private DepartmentService departmentService;

    // 根据HRID，查询对应的PostID，并根据PostID提取所有负责的已投递的简历
    @RequestMapping("/hr_view")
    public ResponseEntity<Map<String, Object>> getCandPostforHR(@RequestHeader Map<String, Object> header,
                                                                @RequestParam(defaultValue = "") String candName,
                                                                @RequestParam(defaultValue = "") String postName) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        if (Objects.equals(postName, "") && Objects.equals(candName, "")) {
            return new ResponseEntity<>(candPostService.getCandPostInfoByHRId(id), HttpStatus.OK);
        }
        // 邀请阶段的不会在已投递的中显示
        List<CandPost> validPosts = candPostService.getCandPostBySubmissionStageIsNot("邀请");
        if (!Objects.equals(postName, "")) {
            // process postName
            postName = postName.split(" ")[1];
            List<Integer> resPostId = postService.getPostIdByPostNameAndHRId(postName, id);
            if (resPostId == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            List<CandPost> candPosts = candPostService.getCandPostByPostIdIn(resPostId);
            candPosts.retainAll(validPosts);
            List<String> candIdList = (candPosts.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getCandId).toList();
            if (!Objects.equals(candName, "")) {
                List<String> candIdListByName = candidateService.getCandIdByCandName(candName);
                candIdListByName.retainAll(candIdList);
                candIdList = candIdListByName;
                candPosts.retainAll(candPostService.getCandPostByCandIdIn(candIdList));
            }
            List<Integer> postIdList = (candPosts.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getPostId).toList();
            List<Candidate> candList = new ArrayList<>();
            List<Post> postList = new ArrayList<>();
            for (String candId : candIdList) {
                candList.add(candidateService.getCandidatesByCandId(candId));
            }
            for (Integer postId : postIdList) {
                postList.add(postService.getPostById(postId));
            }
            Map<String, Object> ans = new HashMap<>();
            ans.put("postId", resPostId);
            //调用put()方法增添数据
            ans.put("candPost", candPosts);
            ans.put("candInfo", candList);
            ans.put("postInfo", postList);
            return new ResponseEntity<>(ans, HttpStatus.OK);
        }

        List<CandPost> candPosts = candPostService.getCandPostByHRId(id);

        List<String> candIdList = (candPosts.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getCandId).toList();
        if (!Objects.equals(candName, "")) {
            // 搜索求职者姓名
            List<String> candList = candidateService.getCandIdByCandName(candName);
            candList.retainAll(candIdList);
            candIdList = candList;
            candPosts = candPostService.getCandPostByCandIdIn(candIdList);
        }
        List<Integer> postIdList = (candPosts.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getPostId).toList();
        List<Candidate> candList = new ArrayList<>();
        List<Post> postList = new ArrayList<>();
        for (String candId : candIdList) {
            candList.add(candidateService.getCandidatesByCandId(candId));
        }
        for (Integer postId : postIdList) {
            postList.add(postService.getPostById(postId));
        }

        Map<String, Object> ans = new HashMap<>();
        //调用put()方法增添数据
        ans.put("candPost", candPosts);
        ans.put("candInfo", candList);
        ans.put("postInfo", postList);
        return new ResponseEntity<>(ans, HttpStatus.OK);
    }

    // 根据id获得具体的CandPost信息
    @RequestMapping("/hr_view/candPostDetail/{candId}/{postId}")
    public ResponseEntity<Map<String, Object>> getCandPostDetail(@RequestHeader Map<String, Object> header,
                                                                 @PathVariable String candId,
                                                                 @PathVariable Integer postId) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null || candId == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 确定是否这个HR有权限访问这个candPost
        Post post = postService.getPostById(postId);
        if (post.getHRId() != id) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(candPostService.getCandPostDetailByCandIdAndPostId(candId, postId), HttpStatus.OK);
    }

    // 用于获取HR的个人信息
    @RequestMapping("/hr_view/user")
    public ResponseEntity<Map<String, Object>> getHRInfo(@RequestHeader Map<String, Object> header) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        HR hr = hrService.getHR(id);
        if (hr == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        Company company = companyService.getCompany(hr.getCompanyId());
        Department department = departmentService.getByCompanyIdAndDepartmentId(hr.getCompanyId(), hr.getDepartmentId());
        Map<String, Object> ans = new HashMap<>();
        //调用put()方法增添数据
        ans.put("HRInfo", hr);
        ans.put("companyInfo", company);
        ans.put("departmentInfo", department);
        // 根据HRID查找负责的post
        return new ResponseEntity<>(ans, HttpStatus.OK);
    }

    // 提交密码的修改到后端
    @RequestMapping("/hr_view/ChangePassword")
    public ResponseEntity<Map<String, Object>> changeHRPassword(@RequestHeader Map<String, Object> header,
                                                                       @RequestBody Map<String, Object> body) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String oldPassword = (String) body.get("oldPassword");
        String newPassword = (String) body.get("newPassword");

        if (oldPassword == null || newPassword == null) {
            System.out.println("changeHRPassword: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(hrService.changePassword(id, oldPassword, newPassword), HttpStatus.OK);
    }

    // 注销该hr的账号
    @RequestMapping("/hr_view/DeleteAccount")
    public ResponseEntity<Map<String, Object>> deleteHRAccount(@RequestHeader Map<String, Object> header) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        hrService.deleteHRById(id);
        Map<String, Object> ans = new HashMap<>();
        ans.put("ok", true);
        ans.put("message", "注销成功");

        return new ResponseEntity<>(ans, HttpStatus.OK);
    }

    // 接受前端传递的个人信息并进行存入
    @RequestMapping("/hr_view/editPersonalInfo")
    public ResponseEntity<Map<String, Object>> editPersonalInfo(@RequestHeader Map<String, Object> header,
                                                                @RequestBody Map<String, Object> body) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        hrService.editPersonalInfo(body);
        departmentService.editDepartmentName(body);

        Map<String, Object> ans = new HashMap<>();
        ans.put("ok", true);
        ans.put("message", "更新成功");

        return new ResponseEntity<>(ans, HttpStatus.OK);
    }

    // 用于将新的注册数据录入数据库
    @RequestMapping("/hr_view/register")
    public ResponseEntity<Map<String, Object>> HRregister(@RequestBody Map<String, Object> body) {
        Map<String, Object> initial = (Map<String, Object>) body.get("initial");
        Map<String, Object> companyInfo = (Map<String, Object>) body.get("companyInfo");
        Map<String, Object> departmentInfo = (Map<String, Object>) body.get("departmentInfo");
        Map<String, Object> passwordInfo = (Map<String, Object>) body.get("passwordInfo");
        Company company = null;
        if (companyInfo != null){
            company = companyService.HRRegisterCompany(companyInfo);
        } else {
            company = companyService.getCompanyByName((String) initial.get("companyName")).get(0);
        }
        String companyToken = company.getCompanyToken();
        String inputToken = (String) departmentInfo.get("companyToken");
        if (!Objects.equals(companyToken, inputToken)){
            Map<String, Object> ans = new HashMap<>();
            ans.put("ok", false);
            ans.put("message", "Token输入错误");
            new ResponseEntity<>(ans, HttpStatus.OK);
        }
        Integer departmentId = departmentService.HRRegisterDepartment(company.getCompanyId(), (String) departmentInfo.get("departmentName"));
        Integer hrId = hrService.HRRegister((String) initial.get("HRName"), company.getCompanyId(), departmentId, (String) passwordInfo.get("password"));

        Map<String, Object> ans = new HashMap<>();
        ans.put("hrId", hrId);
        ans.put("ok", true);
        ans.put("message", "更新成功");

        return new ResponseEntity<>(ans, HttpStatus.OK);
    }
}
