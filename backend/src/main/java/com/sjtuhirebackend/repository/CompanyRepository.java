package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    List<Company> findByCompanyName(String companyName);
    List<Company> findByCompanyScale(String companyScale);
    List<Company> findByFinancingStage(String financeStage);
    List<Company> findByCompanyType(String companyType);
    List<Company> findByCompanyField(String companyField);
    Company findByCompanyId(int companyId);
    @Query("SELECT c.companyName FROM Company c")
    List<String> findAllCompanyNames();
}
