package com.sjtuhirebackend.service;

import java.util.Map;

public interface AuthService {
    // 获取求职者id
    String getCandIdByHeader(Map<String, Object> header);
    // 根据用户名、密码获得求职者token
    String getCandidateToken(String username, String password);

    Integer getHRIdByHeader(Map<String, Object> header);
    String getHRToken(String username, String password);
    String getAdminIdByHeader(Map<String, Object> header);
    String getAdminToken(String username, String password);
}