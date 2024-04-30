package com.sjtuhirebackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@Entity
@Table(name = "cand_project")
public class CandProject {
    @EmbeddedId
    private CandProjectPK biId;
    @Column(name = "role")
    private String role;
}