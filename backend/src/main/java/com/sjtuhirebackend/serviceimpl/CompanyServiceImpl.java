package com.sjtuhirebackend.serviceimpl;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.sjtuhirebackend.dao.CompanyDao;
import com.sjtuhirebackend.dao.DepartmentDao;
import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.entity.Company;
import com.sjtuhirebackend.entity.Department;
import com.sjtuhirebackend.entity.Post;
import com.sjtuhirebackend.service.CompanyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@Scope("prototype")
public class CompanyServiceImpl implements CompanyService {
    @Autowired
    private CompanyDao companyDao;
    @Autowired
    private DepartmentDao departmentDao;
    @Autowired
    private PostDao postDao;

    public List<Company> getCompanies(){
        return companyDao.getCompanies();
    }
    // 根据公司名查找公司
    public Company getCompany(int companyId){
        return companyDao.getCompany(companyId);
    }
    public List<Company> getCompanyByName(String searchCompstr){
        return companyDao.getCompanyByName(searchCompstr);
    }
    // 根据公司规模查找公司
    public List<Company> getCompanyByScale(String searchScale){
        return companyDao.getCompanyByScale(searchScale);
    }
    // 根据公司融资阶段查找公司
    public List<Company> getCompanyByFinancingStage(String searchFinanceStage){
        return companyDao.getCompanyByFin(searchFinanceStage);
    }
    // 根据公司所属行业查找公司
    public List<Company> getCompanyByField(String searchField){
        return companyDao.getCompanyByField(searchField);
    }

    public List<Company> getCompanyByType(String searchType){
        return companyDao.getCompanyByType(searchType);
    }
    // 注册新公司
    public Company registerCompany(int companyId, String companyName, String companyScale, String financingStage,
                            String companyType, String companyField){
        return companyDao.registerCompany(companyId, companyName, companyScale, financingStage, companyType, companyField);
    }

    public void deleteCompany(int companyId){
        companyDao.deleteCompany(companyId);
    }

    public Map<String, Object> getCompanyDetailById(int companyId) {
        Company company = companyDao.getCompany(companyId);
        List<Department> departments = departmentDao.getByCompanyId(companyId);
        List<List<Post>> posts = new ArrayList<>();
        for (Department department : departments) {
            posts.add(postDao.getPostByCompDep(companyId, department.getBiId().getDepartmentId()));
        }

        Map<String, Object> ans = new HashMap<>();
        ans.put("posts", posts);
        ans.put("company", company);
        ans.put("departments", departments);

        return ans;
    }

}
