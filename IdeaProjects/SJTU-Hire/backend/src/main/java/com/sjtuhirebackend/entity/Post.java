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
@Table(name = "post")
public class Post {
    @Id
    @Column(name = "postId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;
    @Column(name = "postName")
    private String postName;
    @Column(name = "degreeReq")
    private String degreeReq;
    @Column(name = "workYearReq")
    private int workYearReq;
    @Column(name = "onSiteDayReq")
    private int onSiteDayReq;
    @Column(name = "city")
    private String city;
    @Column(name = "openDate")
    @Temporal(TemporalType.DATE)
    private Date openDate;
    @Column(name = "endDate")
    @Temporal(TemporalType.DATE)
    private Date endDate;
    @Column(name = "recruitNum")
    private int recruitNum;
    @Column(name = "salary")
    private int salary;
    @Column(name = "companyId")
    private int companyId;
    @Column(name = "departmentId")
    private int departmentId;
    @Column(name = "workStyle")
    private String workStyle;
    @Column(name = "workType")
    private String workType;
    @Column(name = "HRId")
    private int HRId;
    @Column(name = "description")
    private String description;
    @Column(name = "responsibility")
    private String responsibility;
}