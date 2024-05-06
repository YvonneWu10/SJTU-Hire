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

    @RequestMapping("/candidate_view/SearchPost")
    public ResponseEntity<List<Post>> searchPosts(@RequestHeader Map<String, Object> header,
                                                  @RequestParam(defaultValue = "") String postName,
                                                  @RequestParam(defaultValue = "") String city,
                                                  @RequestParam(defaultValue = "") String workType,
                                                  @RequestParam(defaultValue = "") String workStyle) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        if (Objects.equals(postName, "") && Objects.equals(city, "")) {
            return new ResponseEntity<>(postService.getPosts(), HttpStatus.OK);
        }

        List<Post> result = new ArrayList<>();
        boolean flag = false;

        if (!Objects.equals(postName, "")) {
            flag = true;
            result = postService.getPostByName(postName);
        }

        if (!Objects.equals(city, "")) {
            if (flag && result.isEmpty()) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

            List<Post> cityRes = postService.getPostByCity(city);
            if (!flag) {
                flag = true;
                result = cityRes;
            } else {
                result.retainAll(cityRes);
            }
        }

        if (!Objects.equals(workType, "")) {
            if (flag && result.isEmpty()) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

            List<Post> workTypeRes = postService.getPostByWorkType(workType);
            if (!flag) {
                flag = true;
                result = workTypeRes;
            } else {
                result.retainAll(workTypeRes);
            }
        }

        if (!Objects.equals(workStyle, "")) {
            if (flag && result.isEmpty()) {
                return new ResponseEntity<>(result, HttpStatus.OK);
            }

            List<Post> workStyleRes = postService.getPostByWorkStyle(workStyle);
            if (!flag) {
                flag = true;
                result = workStyleRes;
            } else {
                result.retainAll(workStyleRes);
            }
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

        return new ResponseEntity<>(postService.getPostDetailById(postId), HttpStatus.OK);
    }

    @RequestMapping("/candidate_view/PostCities")
    public ResponseEntity<List<String>> getPostCities(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(postService.getDistinctPostCities(), HttpStatus.OK);
    }
}