package com.sjtuhirebackend.service;


import java.util.Map;

public interface AuthService {
    String getCandIdByHeader(Map<String, Object> header);
    String getCandidateToken(String username, String password);

    Integer getHRIdByHeader(Map<String, Object> header);
    String getHRToken(String username, String password);

    String getAdminIdByHeader(Map<String, Object> header);
    String getAdminToken(String username, String password);
}