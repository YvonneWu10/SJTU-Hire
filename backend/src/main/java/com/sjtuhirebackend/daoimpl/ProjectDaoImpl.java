package com.sjtuhirebackend.daoimpl;

import com.sjtuhirebackend.dao.ProjectDao;
import com.sjtuhirebackend.entity.Project;
import com.sjtuhirebackend.repository.ProjectRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@Slf4j
public class ProjectDaoImpl implements ProjectDao {
    @Autowired
    private ProjectRepository projectRepository;

    public Project getProjectById(int projectId) { return projectRepository.findByProjectId(projectId); }
    public List<Project> getProjects() { return projectRepository.findAll(); }
    public List<Project> getProjectByCandId(String candId) { return projectRepository.findByParticipant(candId); }
}