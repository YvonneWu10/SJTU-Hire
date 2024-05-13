package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Project;

import java.util.List;


public interface ProjectDao {
    Project getProjectById(int projectId);
    List<Project> getProjects();
    List<Project> getProjectByCandId(String candId);

    void deleteProject(int projectId);

    void saveProject(Project project);
}