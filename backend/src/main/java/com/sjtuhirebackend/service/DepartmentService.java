package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Department;

import java.util.List;
import java.util.Map;

public interface DepartmentService {
    List<Department> getDepartments();
    Department getByCompanyIdAndDepartmentId(int companyId, int departmetnId);
    List<Department> getByCompanyId(int companyId);
    List<Department> getByDepartmentId(int departmentId);
    List<Department> getByDepartmentName(String departmentName);
    void editDepartmentName(Map<String, Object> map);
    Integer HRRegisterDepartment(Integer companyId, String departmentName);
}
