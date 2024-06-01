package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.*;
import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

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

    @RequestMapping("/hr_view/candPostDetail/{candId}/{postId}")
    public ResponseEntity<Map<String, Object>> getCandPostDetail(@RequestHeader Map<String, Object> header,
                                                                 @PathVariable String candId,
                                                                 @PathVariable Integer postId) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null || candId == null){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 确定是否这个HR有权限访问这个candPost
        Post post = postService.getPostById(postId);
        if (post.getHRId() != id){
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(candPostService.getCandPostDetailByCandIdAndPostId(candId, postId), HttpStatus.OK);
    }

    // 管理者查找符合条件的投递信息
    @RequestMapping("/administer/searchCandPost")
    public ResponseEntity<Map<String, Object>> AdminsearchCandPost(@RequestHeader Map<String, Object> header,
                                                                   @RequestParam(defaultValue = "") String candName,
                                                                   @RequestParam(defaultValue = "") String postName,
                                                                   @RequestParam(defaultValue = "0") int pageIndex,
                                                                   @RequestParam(defaultValue = "10") int pageSize) {
//        System.out.println("searchCandPost..."); //调试
        //鉴权
        String userType = (String) header.get("user-type");
        String id = null;
        if ("candidate".equals(userType)) {
            id = authService.getCandIdByHeader(header);
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
//        System.out.println("Authorization passed..."); //调试

        List<Map<String, Object>> result = new ArrayList<>();

        // 无筛选条件时使用分页查询
        if (Objects.equals(postName, "") && Objects.equals(candName, "")) {
            List<CandPost> candPosts = candPostService.getPagedCandPosts(pageIndex, pageSize);
//            System.out.println("前后页！！" + candPosts); //调试

            for (CandPost candPost : candPosts) {
                Map<String, Object> combined = new HashMap<>();
                Candidate candidate = candidateService.getCandidatesByCandId(candPost.getBiId().getCandId());
                Post post = postService.getPostById(candPost.getBiId().getPostId());

                combined.put("candID", candidate.getCandId());
                combined.put("candName", candidate.getCandName());
                combined.put("postID", post.getPostId());
                combined.put("postName", post.getPostName());
                combined.put("submissionDate", candPost.getSubmissionDate());
                combined.put("submissionStage", candPost.getSubmissionStage());

                result.add(combined);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("data", result);
            response.put("totalPages", candPostService.getTotalPages(pageSize));

            return ResponseEntity.ok(response);
        }

        System.out.println("In filter process...");

        // 如果有给定候选人名字，先根据候选人名字筛选候选人列表
        if (!Objects.equals(candName, "")) {
            List<Candidate> candidates = candidateService.getCandidatesByCandName(candName);
            for (Candidate candidate : candidates) {
                // 基于候选人ID获取其所有职位关系
                List<CandPost> candPosts = candPostService.getCandPostByCandId(candidate.getCandId());

                for (CandPost candPost : candPosts) {
                    // 通过 postID 获取职位信息
                    Post post = postService.getPostById(candPost.getBiId().getPostId());

                    // 检查职位名字是否匹配
                    if (Objects.equals(postName, "") || post.getPostName().equals(postName)) {
                        Map<String, Object> combined = new HashMap<>();
                        combined.put("candID", candidate.getCandId());
                        combined.put("candName", candidate.getCandName());
                        combined.put("postID", post.getPostId());
                        combined.put("postName", post.getPostName());
                        combined.put("submissionDate", candPost.getSubmissionDate());
                        combined.put("submissionStage", candPost.getSubmissionStage());

                        result.add(combined);
                    }
                }
            }
        }
        // 如果没有指定候选人名字而指定了职位名字，则先根据职位名字筛选职位列表
        else {
            List<Post> posts = postService.getPostByName(postName);

            for (Post post : posts) {
                // 基于职位ID获取其所有候选人关系
                List<CandPost> candPosts = candPostService.getCandPostByPostId(post.getPostId());

                for (CandPost candPost : candPosts) {
                    // 通过 candID 获取候选人信息
                    Candidate candidate = candidateService.getCandidatesByCandId(candPost.getBiId().getCandId());

                    Map<String, Object> combined = new HashMap<>();
                    combined.put("candID", candidate.getCandId());
                    combined.put("candName", candidate.getCandName());
                    combined.put("postID", post.getPostId());
                    combined.put("postName", post.getPostName());
                    combined.put("submissionDate", candPost.getSubmissionDate());
                    combined.put("submissionStage", candPost.getSubmissionStage());

                    result.add(combined);
                }
            }
        }


        Map<String, Object> response = new HashMap<>();
        response.put("data", result);
        response.put("totalPages", null);
        return ResponseEntity.ok(response);


    }

    // 管理者查找符合条件的HR
    @RequestMapping("/administer/SearchHRs")
    public ResponseEntity<List<HR>> searchHRs(@RequestHeader Map<String, Object> header,
                                              @RequestParam(defaultValue = "") String HRName) {
        String userType = (String) header.get("user-type");
        String id = null;
        if ("candidate".equals(userType)) {
            id = authService.getCandIdByHeader(header);
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        List<HR> result = hrService.getHRs();

        //根据HRName筛选
        if (!Objects.equals(HRName,"")){
            result.retainAll(hrService.getHRByName(HRName));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 删除HR
    @DeleteMapping(value = "/deleteHR/{HRId}")
    public ResponseEntity<String> deleteHRById(@RequestHeader Map<String, Object> header,
                                                      @PathVariable Integer HRId) {
        // 检查管理员权限
        String userType = (String) header.get("user-type");
        String id = null;
        if ("HR".equals(userType)) {
            id = authService.getHRIdByHeader(header).toString();
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }

        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // 检查是否提供了有效的candId
        if (HRId == null || HRId <= 0) {
            System.out.println("Invalid id: " + id);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // 检查是否存在对应cand
        if (hrService.getHR(HRId) == null) {
            System.out.println("No HR id: " + id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 调用服务层删除
        hrService.deleteHRById(HRId);
        // 删除成功
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    // 删除投递信息
    @DeleteMapping(value = "/deleteCandPost/candID={candID}&postID={postID}")
    public ResponseEntity<String> deleteCandPostById(@RequestHeader Map<String, Object> header,
                                                      @PathVariable String candID,
                                                      @PathVariable Integer postID) {
        // 检查管理员权限
        String userType = (String) header.get("user-type");
        String id = null;
        if ("HR".equals(userType)) {
            id = authService.getHRIdByHeader(header).toString();
        }
        if ("admin".equals(userType)) {
            id = authService.getAdminIdByHeader(header);
        }

        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // 检查是否提供了有效的candID 和 postID
        if (candID == null  || postID == null || postID <= 0) {
            System.out.println("Invalid id, candID: " + candID + "postID: " + postID);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // 检查是否存在对应candPost
        if (candPostService.getCandPostByCandIdAndPostId(candID, postID) == null) {
            System.out.println("No candPost, candID: " + candID + "postID: " + postID);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 调用服务层删除
        candPostService.deleteCandPost(candID, postID);
        // 删除成功
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
