package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.AdminDao;
import com.sjtuhirebackend.entity.Administer;
import com.sjtuhirebackend.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class AdminDaoImpl implements AdminDao {
    @Autowired
    private AdminRepository adminRepository;

    //通过ID获取管理者
    public Administer getAdminByID(String adminID) {
        return adminRepository.findByAdminID(adminID);
    }

    //通过Token获取管理者
    public Administer getAdminByToken(String adminToken) {
        return adminRepository.findByAdminToken(adminToken);
    }

    //获取所有管理者
    public List<Administer> getAdmins() {
        return adminRepository.findAll();
    }

    //通过ID列表获取管理者
    public List<Administer> getAdminsByIDList(List<String> adminIDs) {
        return adminRepository.findByAdminIDIn(adminIDs);
    }

    //通过名字列表获取管理者【这里如何通过姓氏碎片检索】
    public List<Administer> getAdminsByName(String name) {
        return adminRepository.findByAdminName(name);
    }
}
