package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.mapping.PrimaryKey;

@Data
@Setter
@Getter
@Entity
@Table(name = "department")
public class Department {
    @EmbeddedId
    private DepartmentPK biId;
    @Column(name = "departmentName")
    private String departmentName;
}