package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.AdminDao;
import com.sjtuhirebackend.dao.CandidateDao;
import com.sjtuhirebackend.entity.Administer;

import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.dao.HRDao;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.HR;
import com.sjtuhirebackend.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;


@Service
@Slf4j
@Scope("prototype")
public class AuthServiceImpl implements AuthService {
    @Autowired
    private CandidateDao candidateDao;
    @Autowired
    private HRDao hrDao;
    @Autowired
    private AdminDao adminDao;

    public String getCandidateToken(String username, String password) {
//        System.out.println("username: " + username);
        Candidate res = candidateDao.getCandidateByCandId(username);
        if (res != null && Objects.equals(res.getCandPassword(), password)) {
//            System.out.println("CandidateToken: " + res.getCandId());
            return res.getCandToken();
        }

        return null;
    }

    public String getCandIdByHeader(Map<String, Object> header) {
        String token = (String) header.get("token");

        if (token == null){
            System.out.println("getCandNameByCandToken: 缺少参数");
            return null;
        }

        Candidate res = candidateDao.getCandidateByCandToken(token);

        if (res != null) {
            return res.getCandId();
        }
        return null;
    }

    public Integer getHRIdByHeader(Map<String, Object> header){
        String token = (String) header.get("token");

        if (token == null){
            System.out.println("getHRByCandToken: 缺少参数");
            return null;
        }

        HR res = hrDao.getHRByHRToken(token);

        if (res != null) {
            return res.getHRId();
        }
        return null;
    }
    public String getHRToken(String username, String password){
        HR res = hrDao.getHR(Integer.parseInt(username));
        if (res != null && Objects.equals(res.getHRPassword(), password)) {
            return res.getHRToken();
        }
        return null;
    }

    public String getAdminToken(String ID, String password) {
        Administer res = adminDao.getAdminByID(ID);
        if (res != null && Objects.equals(res.getAdminPw(), password)) {
            return res.getAdminToken();
        }
        return null;
    }

    public String getAdminIdByHeader(Map<String, Object> header) {
        String token = (String) header.get("token");

        if (token == null){
            System.out.println("getAdminByCandToken: 缺少参数");
            return null;
        }

        Administer res = adminDao.getAdminByToken(token);

        if (res != null) {
            return res.getAdminID();
        }
        return null;
    }
}