package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Administer;

import java.util.List;

public interface AdminService {
    String getAdminNameByID(String id); //通过ID获取管理者姓名
    Administer getAdminByID(String id); //通过ID获取管理者
    List<Administer> getAdmins();   //获取所有管理者
    List<Administer> getAdminsByName(String name);  //通过名字列表获取管理者【这里如何通过姓氏碎片检索】
}
