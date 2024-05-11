package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.ArrayList;

@RestController
@Slf4j
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private AuthService authService;

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
    public ResponseEntity<Post> getPostDetailById(@RequestHeader Map<String, Object> header,
                                                  @PathVariable Integer postId) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (postId == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(postService.getPostById(postId), HttpStatus.OK);
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