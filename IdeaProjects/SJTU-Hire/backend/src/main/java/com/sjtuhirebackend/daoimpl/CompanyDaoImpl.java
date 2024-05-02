package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.CompanyDao;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Company;
import com.sjtuhirebackend.repository.CompanyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.metadata.CallParameterMetaData;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class CompanyDaoImpl implements CompanyDao {
    @Autowired
    private CompanyRepository companyRepository;
    public List<Company> getCompanies(){
        return companyRepository.findAll();
    }
    public Company getCompany(int id){
        return companyRepository.findByCompanyId(id);
    }
    public List<Company> getCompanyByName(String searchCompstr){
        return companyRepository.findByCompanyNameContaining(searchCompstr);
    }
    // 根据公司规模查找公司
    public List<Company> getCompanyByScale(String searchScale){
        return companyRepository.findByCompanyScale(searchScale);
    }
    // 根据公司融资阶段查找公司
    public List<Company> getCompanyByFin(String searchFinanceStage){
        return companyRepository.findByFinancingStage(searchFinanceStage);
    }
    // 根据公司所属行业查找公司
    public List<Company> getCompanyByField(String searchField){
        return companyRepository.findByCompanyField(searchField);
    }
    // 根据公司类型
    public List<Company> getCompanyByType(String searchType){
        return companyRepository.findByCompanyType(searchType);
    }
    // 注册新公司
    public Company registerCompany(int companyId, String companyName, String companyScale, String financingStage,
                            String companyType, String companyField){
        Company company = new Company();
        company.setCompanyId(companyId);
        company.setCompanyName(companyName);
        company.setCompanyScale(companyScale);
        company.setFinancingStage(financingStage);
        company.setCompanyType(companyType);
        company.setCompanyField(companyField);
        companyRepository.save(company);
        return company;
    }
    // 删除公司信息
    public void deleteCompany(int companyId){
        companyRepository.deleteById(companyId);
    }
}
