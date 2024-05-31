package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "company")
public class Company {
    @Id
    @Column(name = "companyId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int companyId;
    @Column(name = "companyName")
    private String companyName;
    @Column(name = "companyScale")
    private String companyScale;
    @Column(name = "financingStage")
    private String financingStage;
    @Column(name = "companyType")
    private String companyType;
    @Column(name = "companyField")
    private String companyField;
    @Column(name = "companyToken")
    private String companyToken;
    @Column(name = "description")
    private String description;
}