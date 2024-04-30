package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.DepartmentService;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class DepartmentController {
    @Autowired
    private DepartmentService departmentService;

    @RequestMapping("/AllDepartments")
    public ResponseEntity<List<Department>> getAllPosts() {
        return new ResponseEntity<>(departmentService.getDepartments(), HttpStatus.OK);
    }
}
