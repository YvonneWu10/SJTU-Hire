package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.HR;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HRRepository extends JpaRepository<HR, Integer> {
    HR findByHRId(int HRid);
    HR findByHRToken(String HRToken);
    List<HR> findByHRName(String HRName);
    List<HR> findByHRNameContaining(String HRName);
    List<HR> findByCompanyId(int companyId);
    List<HR> findByDepartmentId(int DepartmentId);
    List<HR> findByCompanyIdAndDepartmentId(int companyId, int departmentId);
}
