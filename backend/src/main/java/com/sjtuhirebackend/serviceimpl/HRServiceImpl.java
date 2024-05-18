package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.HRDao;
import com.sjtuhirebackend.entity.HR;
import com.sjtuhirebackend.service.HRService;
import com.sjtuhirebackend.utils.TokenGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return hrDao.getHRByName(HRName);
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

    public Map<String, Object> changePassword(Integer id, String oldPassword, String newPassword) {
        HR hr = hrDao.getHR(id);
        if (!hr.getHRPassword().equals(oldPassword)) {
            Map<String, Object> ans = new HashMap<>();
            ans.put("ok", false);
            ans.put("message", "原密码错误");
            return ans;
        }

        hr.setHRPassword(newPassword);
        hrDao.saveHR(hr);

        Map<String, Object> ans = new HashMap<>();
        ans.put("ok", true);
        ans.put("message", "修改成功");
        return ans;
    }

    public void editPersonalInfo(Map<String, Object> map){
        String hrName = (String) map.get("HRName");
        Integer hrId = (Integer) map.get("hrId");

        HR hr = hrDao.getHR(hrId);
        hr.setHRName(hrName);
        hrDao.saveHR(hr);
    }
    public Integer HRRegister(String HRName, Integer companyId, Integer departmentId, String password){
        HR hr = new HR();
        hr.setHRName(HRName);
        hr.setCompanyId(companyId);
        hr.setDepartmentId(departmentId);
        hr.setHRPassword(password);
        String token = TokenGenerator.generateToken(12);
        while (hrDao.existToken(token)) {
            token = TokenGenerator.generateToken(12);
        }
        hr.setHRToken(token);
        hrDao.saveHR(hr);
        HR hr_ = hrDao.getHRByHRToken(token);
        return hr_.getHRId();
    }
}
