package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Administer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Administer, String> {
    Administer findByAdminID(String adminID);
    Administer findByAdminToken(String adminToken);
    List<Administer> findByAdminIDIn(List<String> adminIDs);
    List<Administer> findByAdminName(String adminName);
}