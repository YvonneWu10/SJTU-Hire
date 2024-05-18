package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.DepartmentDao;
import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.DepartmentPK;
import com.sjtuhirebackend.service.DepartmentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

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
    public void editDepartmentName(Map<String, Object> map){
        String departmentName = (String) map.get("departmentName");
        Integer departmentId = (Integer) map.get("departmentId");
        Integer companyId = (Integer) map.get("companyId");

        Department department = departmentDao.getByCompanyIdAndDepartmentId(companyId, departmentId);
        department.setDepartmentName(departmentName);
        departmentDao.saveDepartment(department);
    }
    public Integer HRRegisterDepartment(Integer companyId, String departmentName){
        List<Department> departments = departmentDao.getByCompanyIdAscDepartmentId(companyId);
        Integer departmentId = 1;
        for (Department department: departments){
            if (Objects.equals(department.getDepartmentName(), departmentName)) {
                return department.getBiId().getDepartmentId();
            }
            if (Objects.equals(departmentId, department.getBiId().getDepartmentId())){
                departmentId = departmentId + 1;
            }
        }
        Department department = new Department();
        department.setDepartmentName(departmentName);
        DepartmentPK departmentPK = new DepartmentPK();
        departmentPK.setCompanyId(companyId);
        departmentPK.setDepartmentId(departmentId);
        department.setBiId(departmentPK);
        departmentDao.saveDepartment(department);
//        departments = departmentDao.getByCompanyId(companyId);
//        for (Department department_: departments){
//            if (Objects.equals(department_.getDepartmentName(), departmentName)){
//                return department_.getBiId().getDepartmentId();
//            }
//        }
        return departmentId;
    }
}
