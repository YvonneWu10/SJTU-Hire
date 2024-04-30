package com.sjtuhirebackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Setter
@Getter
@Entity
@Table(name = "cand_post")
public class CandPost {
    @EmbeddedId
    private CandPostPK biId;
    @Column(name = "submissionDate")
    @Temporal(TemporalType.DATE)
    private Date submissionDate;
    @Column(name = "submissionStage")
    private String submissionStage;
}