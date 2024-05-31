package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Data
@Setter
@Getter
@Entity
@Table(name = "administer")
public class Administer {
    @Id
    @Column(name = "adminID")
    private String adminID;

    @Column(name = "adminPw")
    private String adminPw;

    @Column(name = "adminName")
    private String adminName;

    @Column(name = "adminToken")
    private String adminToken;
}
