package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.AdminDao;
import com.sjtuhirebackend.entity.Administer;
import com.sjtuhirebackend.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Scope("prototype")
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminDao adminDao;

    public String getAdminNameByID(String id) {
        Administer res = adminDao.getAdminByID(id);
        if (res != null) {
            return res.getAdminName();
        }
        return null;
    }

    public Administer getAdminByID(String id) {
        return adminDao.getAdminByID(id);
    }

    public List<Administer> getAdmins() {
        return adminDao.getAdmins();
    }

    public List<Administer> getAdminsByName(String name) {
        return adminDao.getAdminsByName(name);
    }
}
