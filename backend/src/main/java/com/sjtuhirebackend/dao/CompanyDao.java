package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Company;

import java.util.List;


public interface CompanyDao {
    List<Company> getCompanies();
    Company getCompany(int id);
    List<Company> getCompanyByName(String searchCompstr);
    // 根据公司规模查找公司
    List<Company> getCompanyByScale(String searchScale);
    // 根据公司融资阶段查找公司
    List<Company> getCompanyByFin(String searchFinanceStage);
    // 根据公司所属行业查找公司
    List<Company> getCompanyByField(String searchField);
    // 根据公司类型
    List<Company> getCompanyByType(String searchType);
    // 注册新公司
    Company registerCompany(int companyId, String companyName, String companyScale, String financingStage,
                            String companyType, String companyField);
    // 删除公司信息
    void deleteCompany(int companyId);

    long companyCount();
}
