package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "hr")
public class HR {
    @Id
    @Column(name = "HRId")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int HRId;
    @Column(name = "HRName")
    private String HRName;
    @Column(name = "companyId")
    private int companyId;
    @Column(name = "departmentId")
    private int departmentId;
    @Column(name = "password")
    private String HRPassword;
    @Column(name = "token")
    private String HRToken;
}
