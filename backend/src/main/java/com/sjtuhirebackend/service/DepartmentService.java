package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Department;

import java.util.List;

public interface DepartmentService {
    List<Department> getDepartments();
    Department getByCompanyIdAndDepartmentId(int companyId, int departmetnId);
    List<Department> getByCompanyId(int companyId);
    List<Department> getByDepartmentId(int departmentId);
    List<Department> getByDepartmentName(String departmentName);
}
