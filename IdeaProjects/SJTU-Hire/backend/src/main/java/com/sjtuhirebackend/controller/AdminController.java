package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.service.AdminService;
import com.sjtuhirebackend.service.AuthService;
import com.sjtuhirebackend.service.PostService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private AuthService authService;
    @Autowired
    private PostService postService;

    @RequestMapping("/administer-main/adminname")
    public ResponseEntity<Map<String, Object>> getAdminNameByToken(@RequestHeader Map<String, Object> header) {
        String id = authService.getAdminIdByHeader(header);
        if (id == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        String name = adminService.getAdminNameByID(id);

        return new ResponseEntity<>(Map.of("adminname", name), HttpStatus.OK);
    }

}
