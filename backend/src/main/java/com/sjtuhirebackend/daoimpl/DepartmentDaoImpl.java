package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.DepartmentDao;
import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.repository.DepartmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class DepartmentDaoImpl implements DepartmentDao {
    @Autowired
    private DepartmentRepository departmentRepository;
    public List<Department> getDepartments(){
        return departmentRepository.findAll();
    }
    public Department getByCompanyIdAndDepartmentId(int companyId, int departmetnId){
        return departmentRepository.findByBiIdCompanyIdAndBiIdDepartmentId(companyId, departmetnId);
    }
    public List<Department> getByCompanyId(int companyId){
        return departmentRepository.findByBiIdCompanyId(companyId);
    }
    public List<Department> getByDepartmentId(int departmentId){
        return departmentRepository.findByBiIdDepartmentId(departmentId);
    }
    public List<Department> getByDepartmentName(String departmentName){
        return departmentRepository.findByDepartmentName(departmentName);
    }
}
