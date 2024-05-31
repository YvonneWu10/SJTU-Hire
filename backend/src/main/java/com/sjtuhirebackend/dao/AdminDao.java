package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Administer;

import java.util.List;

public interface AdminDao {
    Administer getAdminByID(String adminID);    //通过ID获取管理者
    Administer getAdminByToken(String adminToken);  //通过Token获取管理者
    List<Administer> getAdmins();   //获取所有管理者
    List<Administer> getAdminsByIDList(List<String> adminIDs);  //通过ID列表获取管理者
    List<Administer> getAdminsByName(String name);  //通过名字列表获取管理者【这里如何通过姓氏碎片检索】
}
