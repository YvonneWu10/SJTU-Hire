package com.sjtuhirebackend.repository;

import com.sjtuhirebackend.entity.Project;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Project findByProjectId(int projectId);
    List<Project> findByProjectName(String projectName);
    List<Project> findByStartDate(Date startDate);
    List<Project> findByStartDateBefore(Date startDate);
    List<Project> findByEndDate(Date endDate);
    List<Project> findByEndDateAfter(Date endDate);
    List<Project> findByProjectAchievement(int projectAchievement);
    List<Project> findByProjectAchievementBetween(int lb, int ub);
    List<Project> findByParticipant(String participant);

    @Transactional
    void deleteByProjectId(int projectId);
}