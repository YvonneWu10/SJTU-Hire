package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "candidate")
public class Candidate {
    @Id
    @Column(name = "candId")
    private String candId;
    @Column(name = "candName")
    private String candName;
    @Column(name = "candAge")
    private Integer candAge;
    @Column(name = "candGender")
    private String candGender;
    @Column(name = "candPhone")
    private String candPhone;
    @Column(name = "candMail")
    private String candMail;
    @Column(name = "candProvince")
    private String candProvince;
    @Column(name = "candGPA")
    private Double candGPA;
    @Column(name = "candMentor")
    private String candMentor;
    @Column(name = "candPaperNum")
    private Integer candPaperNum;
    @Column(name = "candDegree")
    private String candDegree;
    @Column(name = "candUniversity")
    private String candUniversity;
    @Column(name = "candMajor")
    private String candMajor;
    @Column(name = "candWorkYear")
    private Integer candWorkYear;
    @Column(name = "candExpectedSalary")
    private Integer candExpectedSalary;
    @Column(name = "password")
    private String candPassword;
    @Column(name = "token")
    private String candToken;

}