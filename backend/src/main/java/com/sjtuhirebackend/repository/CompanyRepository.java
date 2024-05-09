package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    List<Company> findByCompanyNameContaining(String compangName);
    List<Company> findByCompanyScale(String conpanyScale);
    List<Company> findByFinancingStage(String financeStage);
    List<Company> findByCompanyType(String companyType);
    List<Company> findByCompanyField(String companyField);
    Company findByCompanyId(int companyId);
}
