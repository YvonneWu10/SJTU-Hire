package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.DepartmentDao;
import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Scope("prototype")
public class DepartmentServiceImpl implements DepartmentService {
    @Autowired
    private DepartmentDao departmentDao;
    public List<Department> getDepartments(){
        return departmentDao.getDepartments();
    }
    public Department getByCompanyIdAndDepartmentId(int companyId, int departmetnId){
        return departmentDao.getByCompanyIdAndDepartmentId(companyId, departmetnId);
    }
    public List<Department> getByCompanyId(int companyId){
        return departmentDao.getByCompanyId(companyId);
    }
    public List<Department> getByDepartmentId(int departmentId){
        return departmentDao.getByDepartmentId(departmentId);
    }
    public List<Department> getByDepartmentName(String departmentName){
        return departmentDao.getByDepartmentName(departmentName);
    }
}
