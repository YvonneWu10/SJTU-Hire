package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.DepartmentPK;

import java.util.List;

public interface DepartmentDao {
    List<Department> getDepartments();
    void saveDepartment(Department department);
    List<Department> getByCompanyIdAscDepartmentId(int companyId);
    // 根据公司id和部门id查找部门
    Department getByCompanyIdAndDepartmentId(int companyId, int departmetnId);
    // 根据公司id查找部门
    List<Department> getByCompanyId(int companyId);
    List<Department> getByDepartmentId(int departmentId);
    List<Department> getByDepartmentName(String departmentName);
}
