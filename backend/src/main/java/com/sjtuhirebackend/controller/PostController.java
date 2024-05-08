package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.PostService;
import jakarta.persistence.criteria.CriteriaBuilder;
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

    @RequestMapping("/candidate_view/SearchPosts")
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

    @RequestMapping("/candidate_view/PostCities")
    public ResponseEntity<List<String>> getPostCities(@RequestHeader Map<String, Object> header) {
        String id = authService.getCandIdByHeader(header);
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
        boolean flag = false;

        if (!Objects.equals(postName, "")) {
            flag = true;
            result = postService.getPostByName(postName);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

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
}