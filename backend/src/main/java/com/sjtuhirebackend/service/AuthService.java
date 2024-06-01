package com.sjtuhirebackend.service;


import java.util.Map;

public interface AuthService {
    String getCandIdByHeader(Map<String, Object> header);   // 通过header得到应聘者id
    String getCandidateToken(String username, String password); // 得到应聘者token

    Integer getHRIdByHeader(Map<String, Object> header);    // 通过header得到HRid
    String getHRToken(String username, String password);    // 得到HRtoken

    String getAdminIdByHeader(Map<String, Object> header);  // 通过header得到管理员id
    String getAdminToken(String username, String password); // 得到管理员token
}