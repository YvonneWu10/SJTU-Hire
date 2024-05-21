package com.sjtuhirebackend.service;

import com.sjtuhirebackend.entity.Company;

import java.util.List;
import java.util.Map;

public interface CompanyService {
    // 获取所有公司
    List<Company> getCompanies();
    Company getCompany(int companyId);
    // 根据公司名查找公司
    List<Company> getCompanyByName(String searchCompstr);
    // 根据公司规模查找公司
    List<Company> getCompanyByScale(String searchScale);
    // 根据公司融资阶段查找公司
    List<Company> getCompanyByFinancingStage(String searchFinanceStage);
    // 根据公司类型查找公司
    List<Company> getCompanyByType(String searchType);
    // 根据公司所属行业查找公司
    List<Company> getCompanyByField(String searchField);

    // 注册新公司
    Company registerCompany(int companyId, String companyName, String companyScale, String financingStage,
                            String companyType, String companyField);

    void deleteCompany(int companyId);

    // 根据companyId获取公司详细信息
    Map<String, Object> getCompanyDetailById(int companyId);
}
