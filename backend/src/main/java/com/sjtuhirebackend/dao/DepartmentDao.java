package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.DepartmentPK;

import java.util.List;

public interface DepartmentDao {
    List<Department> getDepartments();
    Department getByCompanyIdAndDepartmentId(int companyId, int departmetnId);
    List<Department> getByCompanyId(int companyId);
    List<Department> getByDepartmentId(int departmentId);
    List<Department> getByDepartmentName(String departmentName);
    void saveDepartment(Department department);
    List<Department> getByCompanyIdAscDepartmentId(int companyId);
}
