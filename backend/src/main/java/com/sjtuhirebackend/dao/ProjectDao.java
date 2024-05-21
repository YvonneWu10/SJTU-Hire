package com.sjtuhirebackend.dao;

import com.sjtuhirebackend.entity.Project;

import java.util.List;


public interface ProjectDao {
    Project getProjectById(int projectId);
    List<Project> getProjects();

    // 通过candId获取求职者的项目
    List<Project> getProjectByCandId(String candId);

    // 删除项目
    void deleteProject(int projectId);

    // 保存项目
    void saveProject(Project project);
}