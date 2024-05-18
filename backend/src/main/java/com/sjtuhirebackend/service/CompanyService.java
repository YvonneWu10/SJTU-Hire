package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Company;

import java.util.List;
import java.util.Map;

public interface CompanyService {
    // 获取公司信息
    List<Company> getCompanies();
    Company getCompany(int companyId);
    // 根据公司名查找公司
    List<Company> getCompanyByName(String searchCompstr);
    // 根据公司规模查找公司
    List<Company> getCompanyByScale(String searchScale);
    // 根据公司融资阶段查找公司
    List<Company> getCompanyByFinancingStage(String searchFinanceStage);
    List<Company> getCompanyByType(String searchType);
    // 根据公司所属行业查找公司
    List<Company> getCompanyByField(String searchField);

    // 注册新公司
    Company registerCompany(int companyId, String companyName, String companyScale, String financingStage,
                            String companyType, String companyField);

    void deleteCompany(int companyId);
    Map<String, Object> getCompanyDetailById(int companyId);
    Map<String, Object> editCompany(Map<String, Object> map);
    List<String> getAllCompanyNames();

    Company HRRegisterCompany(Map<String, Object> companyInfo);
}
