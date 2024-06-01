package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.DepartmentPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, DepartmentPK> {
    Department findByBiId(DepartmentPK departmentpk);
    Department findByBiIdCompanyIdAndBiIdDepartmentId(int companyId, int departmetnId);
    List<Department> findByBiIdCompanyId(int companyId);
    List<Department> findByBiIdDepartmentId(int departmentId);
    List<Department> findByDepartmentName(String departmentName);
    List<Department> findByBiIdCompanyIdOrderByBiIdDepartmentIdAsc(int companyId);
}
