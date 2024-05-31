package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.HRDao;
import com.sjtuhirebackend.entity.HR;
import com.sjtuhirebackend.repository.HRRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class HRDaoImpl implements HRDao {
    @Autowired
    private HRRepository hrRepository;
    public List<HR> getHRs(){
        return hrRepository.findAll();
    }
    public HR getHR(int HRId){
        return hrRepository.findByHRId(HRId);
    }
    public HR getHRByHRToken(String HRToken){
        return hrRepository.findByHRToken(HRToken);
    }
    public List<HR> getHRByName(String HRName){
        return hrRepository.findByHRName(HRName);
    }
    public List<HR> getHRByNameContaining(String HRName){ return hrRepository.findByHRNameContaining(HRName); };
    public List<HR> getHRByCompanyId(int companyId){
        return hrRepository.findByCompanyId(companyId);
    }
    public List<HR> getHRByDepartmentId(int departmentId){
        return hrRepository.findByDepartmentId(departmentId);
    }
    public List<HR> getHRByCompanyIdAndDepartmentId(int companyId, int departmentId){
        return hrRepository.findByCompanyIdAndDepartmentId(companyId, departmentId);
    }
    public HR registerHR(int HRId, String HRName, int companyId, int departmentId){
        HR hr = new HR();
        hr.setHRId(HRId);
        hr.setHRName(HRName);
        hr.setCompanyId(companyId);
        hr.setDepartmentId(departmentId);
        hrRepository.save(hr);
        return hr;
    }


    public void deleteHRById(int HRId){
        hrRepository.deleteById(HRId);
    }

    public long HRCount() {return hrRepository.count(); }
}
