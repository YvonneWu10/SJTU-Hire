package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.CandProject;
import com.sjtuhirebackend.entity.CandProjectPK;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CandProjectRepository extends JpaRepository<CandProject, CandProjectPK> {
    CandProject findByBiId(CandProjectPK biId);
    CandProject findByBiIdCandIdAndBiIdProjectId(String candId, int projectId);
    List<CandProject> findByBiIdCandId(String candId);
    List<CandProject> findByBiIdProjectId(int projectId);
    List<CandProject> findByRole(String role);
}
