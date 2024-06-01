package com.sjtuhirebackend.controller;

import com.sjtuhirebackend.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Objects;

@RestController
@Slf4j
public class AuthController {
    @Autowired
    private AuthService authService;

    @RequestMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, Object> map) {
        String type = (String) map.get("type");
        String username = (String) map.get("username");
        String password = (String) map.get("password");

        if (type == null || username == null || password == null){
            System.out.println("login: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        if (Objects.equals(type, "candidate")) {
            String token = authService.getCandidateToken(username, password);
            if (token == null) {
                System.out.println("login failed: 错误的用户名或密码");
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            System.out.println("Token: " + token);
            return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
        } else if (Objects.equals(type, "HR")) {
            String token = authService.getHRToken(username, password);
            if (token == null) {
                System.out.println("login failed: 错误的用户名或密码");
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            System.out.println("Token: " + token);
            return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
        } else if (Objects.equals(type, "admin")) {
            String token = authService.getAdminToken(username, password);
            if (token == null) {
                System.out.println("login failed: 错误的用户名或密码");
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
//            String adminID = authService.getAdminIdByHeader(Map.of("token", token));
            System.out.println("Token: " + token);
//            System.out.println("adminID: " + adminID);
            return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }

    @RequestMapping("/auth")
    public ResponseEntity<Map<String, Object>> auth(@RequestHeader Map<String, Object> header,
                                                    @RequestBody Map<String, Object> body) {
        String type = (String) body.get("type");

        if (type == null){
            System.out.println("auth: 缺少参数");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        if (Objects.equals(type, "candidate")) {
            String id = authService.getCandIdByHeader(header);
            System.out.println("id in auth: " + id);
            if (id == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(Map.of("candId", id), HttpStatus.OK);
        } else if (Objects.equals(type, "HR")) {
            Integer id = authService.getHRIdByHeader(header);
            if (id == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(Map.of("HRId", id), HttpStatus.OK);
        } else if (Objects.equals(type, "admin")) {
            String id = authService.getAdminIdByHeader(header);
            if (id == null) {
                return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
            }
            return new ResponseEntity<>(Map.of("HRId", id), HttpStatus.OK);
        }

        return new ResponseEntity<>(null, HttpStatus.NOT_IMPLEMENTED);
    }
}
