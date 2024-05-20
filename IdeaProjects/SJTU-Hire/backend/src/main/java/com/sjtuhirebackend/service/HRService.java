package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.HR;

import java.util.List;

public interface HRService {
    List<HR> getHRs();
    HR getHR(int HRId);
    List<HR> getHRByName(String HRName);
    List<HR> getHRByCompanyId(int companyId);
    List<HR> getHRByDepartmentId(int departmentId);
    List<HR> getHRByCompanyIdAndDepartmentId(int companyId, int departmentId);
    HR registerHR(int HRId, String HRName, int companyId, int departmentId);
    void deleteHRById(int HRId);
    long HRCount();
}
