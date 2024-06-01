package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.HR;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.HRService;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@Slf4j
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private AuthService authService;
    @Autowired
    private HRService hrService;

    @RequestMapping(value = {"/candidate_view/SearchPosts", "/administer/SearchPosts"})
    public ResponseEntity<List<Post>> searchPosts(@RequestHeader Map<String, Object> header,
                                                  @RequestParam(defaultValue = "") String postName,
                                                  @RequestParam(defaultValue = "") String city,
                                                  @RequestParam(defaultValue = "") String workType,
                                                  @RequestParam(defaultValue = "") String workStyle) {
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

        List<Post> result = postService.getPosts(); // 获取所有岗位

        // 根据postName筛选
        if (!Objects.equals(postName, "")) {
            result.retainAll(postService.getPostByName(postName));
        }

        // 根据city筛选
        if (!Objects.equals(city, "")) {
            result.retainAll(postService.getPostByCity(city));
        }

        // 根据workType筛选
        if (!Objects.equals(workType, "")) {
            result.retainAll(postService.getPostByWorkType(workType));
        }

        // 根据workStyle筛选
        if (!Objects.equals(workStyle, "")) {
            result.retainAll(postService.getPostByWorkStyle(workStyle));
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/candidate_view/Post/{postId}")
    public ResponseEntity<Map<String, Object>> getPostDetailById(@RequestHeader Map<String, Object> header,
                                                                 @PathVariable Integer postId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(postService.getPostDetailById(id, postId), HttpStatus.OK);
    }

    @RequestMapping(value = {"/candidate_view/PostCities", "/administer/PostCities"})
    public ResponseEntity<List<String>> getPostCities(@RequestHeader Map<String, Object> header) {
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

        return new ResponseEntity<>(postService.getDistinctPostCities(), HttpStatus.OK);
    }

    // HR Post management related controller function
    @RequestMapping("/hr_view/managePosts")
    public ResponseEntity<List<Post>> HRsearchPosts(@RequestHeader Map<String, Object> header,
                                                    @RequestParam(defaultValue = "") String postName
    ) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        List<Post> HRResponsiblePost = postService.getPostByHRId(id);
        if (Objects.equals(postName, "")) {
            return new ResponseEntity<>(HRResponsiblePost, HttpStatus.OK);
        }

        List<Post> result = new ArrayList<>();

        if (!Objects.equals(postName, "")) {
            result = postService.getPostByName(postName);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // 根据ID获取对应岗位的详细信息
    @RequestMapping("/hr_view/managePosts/postDetail/{postId}")
    public ResponseEntity<Post> HRgetPostDetailById(@RequestHeader Map<String, Object> header,
                                                    @PathVariable Integer postId) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(postService.getPostById(postId), HttpStatus.OK);
    }

    // 用于获得所有在期限内的岗位信息
    @RequestMapping("/hr_view/retOpenPosts")
    public ResponseEntity<List<String>> retOpenPosts(@RequestHeader Map<String, Object> header) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        List<Post> posts = postService.getPostByHRId(id);
        List<String> postNameList = new ArrayList<>();
        Date current = new Date();
        for (Post post : posts){
            if (post.getOpenDate().after(current) || post.getEndDate().before(current)){
            } else {
                String str = post.getPostId() + " " + post.getPostName();
                postNameList.add(str);
            }
        }
        return new ResponseEntity<>(postNameList, HttpStatus.OK);
    }

    // 用于获得所有该HR负责的岗位信息
    @RequestMapping("/hr_view/retResponsiblePosts")
    public ResponseEntity<List<String>> retResponsiblePosts(@RequestHeader Map<String, Object> header) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        List<Post> posts = postService.getPostByHRId(id);
        List<String> postNameList = new ArrayList<>();
        for (Post post : posts){
            String str = post.getPostId() + " " + post.getPostName();
            postNameList.add(str);
        }
        return new ResponseEntity<>(postNameList, HttpStatus.OK);
    }

    @RequestMapping("/hr_view/PostCities")
    public ResponseEntity<List<String>> getHRPostCities(@RequestHeader Map<String, Object> header) {
        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(postService.getDistinctPostCities(), HttpStatus.OK);
    }

    @RequestMapping("/hr_view/editPostDetail/")
    public ResponseEntity<String> editPostDetail(@RequestHeader Map<String, Object> header,
                                                 @RequestBody Map<String, Object> map) throws ParseException {
        Integer postId = (Integer) map.get("postId");
        String postName = (String) map.get("postName");
        String degreeReq = (String) map.get("degreeReq");
        Integer workYearReq = (Integer) map.get("workYearReq");
        Integer onSiteDayReq = (Integer) map.get("onSiteDayReq");
        String city = (String) map.get("city");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date openDate = sdf.parse((String) map.get("openDate"));
        Date endDate = sdf.parse((String) map.get("endDate"));
        Integer recruitNum = (Integer) map.get("recruitNum");
        Integer salary = (Integer) map.get("salary");
        String workStyle = (String) map.get("workStyle");
        String workType = (String) map.get("workType");
        String description = (String) map.get("description");
        String responsibility = (String) map.get("responsibility");

        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        postService.editPost(postId, postName, degreeReq, workYearReq,
                onSiteDayReq, city, openDate, endDate,
                recruitNum, salary, workStyle, workType,
                description, responsibility);

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    // 用于创建具体的岗位，并赋予postID值
    @RequestMapping("/hr_view/HRCreatePost/")
    public ResponseEntity<String> HRcreatePost(@RequestHeader Map<String, Object> header,
                                               @RequestBody Map<String, Object> map) throws ParseException {
        String postName = (String) map.get("postName");
        String degreeReq = (String) map.get("degreeReq");
        Integer workYearReq = (Integer) map.get("workYearReq");
        Integer onSiteDayReq = (Integer) map.get("onSiteDayReq");
        String city = (String) map.get("city");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date openDate = sdf.parse((String) map.get("openDate"));
        Date endDate = sdf.parse((String) map.get("endDate"));
        Integer recruitNum = (Integer) map.get("recruitNum");
        Integer salary = (Integer) map.get("salary");
        String workStyle = (String) map.get("workStyle");
        String workType = (String) map.get("workType");
        String description = (String) map.get("description");
        String responsibility = (String) map.get("responsibility");

        Integer id = authService.getHRIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        HR hr = hrService.getHR(id);

        postService.createPost(postName, degreeReq, workYearReq,
                onSiteDayReq, city, openDate, endDate,
                recruitNum, salary, workStyle, workType,
                description, responsibility, hr.getDepartmentId(), hr.getCompanyId(), id);

        return new ResponseEntity<>("", HttpStatus.OK);
    }

    // 删除岗位
    @DeleteMapping(value = "/deletePost/{postId}")
    public ResponseEntity<String> deletePostById(@RequestHeader Map<String, Object> header,
                                                 @PathVariable Integer postId) {
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

        // 检查是否提供了有效的postId
        if (postId == null || postId <= 0) {
            System.out.println("Invalid id: " + id);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // 检查是否存在对应post
        if (postService.getPostById(postId) == null) {
            System.out.println("No post id: " + id);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // 调用服务层删除
        postService.deletePost(postId);

        // 删除成功
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}