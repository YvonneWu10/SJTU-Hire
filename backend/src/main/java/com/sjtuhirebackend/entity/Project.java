package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Setter
@Getter
@Entity
@Table(name = "project")
public class Project {
    @Id
    @Column(name = "projectId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int projectId;
    @Column(name = "projectName")
    private String projectName;
    @Column(name = "startDate")
    @Temporal(TemporalType.DATE)
    private Date startDate;
    @Column(name = "endDate")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    @Column(name = "projectAchievement")
    private Integer projectAchievement;
    @Column(name = "participant")
    private String participant;
    @Column(name = "role")
    private String role;
    @Column(name = "description")
    private String description;
}
