package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.HR;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface HRDao {
    List<HR> getHRs();
    HR getHR(int HRId);
    HR getHRByHRToken(String HRToken);
    List<HR> getHRByName(String HRName);
    List<HR> getHRByNameContaining(String HRName);
    List<HR> getHRByCompanyId(int companyId);
    List<HR> getHRByDepartmentId(int departmentId);
    List<HR> getHRByCompanyIdAndDepartmentId(int companyId, int departmentId);
    HR registerHR(int HRId, String HRName, int companyId, int departmentId);
    void deleteHRById(int HRId);
}
