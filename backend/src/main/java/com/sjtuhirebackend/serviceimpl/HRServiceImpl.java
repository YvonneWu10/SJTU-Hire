package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.HRDao;
import com.sjtuhirebackend.entity.HR;
import com.sjtuhirebackend.service.HRService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@Scope("prototype")
public class HRServiceImpl implements HRService {
    @Autowired
    private HRDao hrDao;
    public List<HR> getHRs(){
        return hrDao.getHRs();
    }
    public HR getHR(int HRId){
        return hrDao.getHR(HRId);
    }
    public List<HR> getHRByName(String HRName){
        return hrDao.getHRByNameContaining(HRName);
    }
    public List<HR> getHRByCompanyId(int companyId){
        return hrDao.getHRByCompanyId(companyId);
    }
    public List<HR> getHRByDepartmentId(int departmentId){
        return hrDao.getHRByDepartmentId(departmentId);
    }
    public List<HR> getHRByCompanyIdAndDepartmentId(int companyId, int departmentId){
        return hrDao.getHRByCompanyIdAndDepartmentId(companyId, departmentId);
    }
    public HR registerHR(int HRId, String HRName, int companyId, int departmentId){
        return hrDao.registerHR(HRId, HRName, companyId, departmentId);
    }
    public void deleteHRById(int HRId){
        hrDao.deleteHRById(HRId);
    }

    public long HRCount() { return hrDao.HRCount(); }
}
