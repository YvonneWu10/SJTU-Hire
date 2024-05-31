package com.sjtuhirebackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;

import java.io.Serializable;

@Embeddable
@Table(name = "cand_project")
public class CandProjectPK implements Serializable {
    @Column(name = "candId")
    private String candId;
    @Column(name = "projectId")
    private Integer projectId;

    public void setCandId(String candId){
        this.candId = candId;
    }
    public void setProjectId(Integer projectId){
        this.projectId = projectId;
    }
    public String getCandId(){
        return candId;
    }
    public Integer getProjectId(){
        return projectId;
    }

    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + ((candId == null) ? 0 : candId.hashCode());
        result = prime * result + ((projectId == null) ? 0 : projectId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj){
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        CandProjectPK other = (CandProjectPK) obj;
        if (candId == null){
            if (other.candId != null)
                return false;
        } else if (!candId.equals(other.candId))
            return false;

        if (projectId == null){
            return other.projectId == null;
        } else return projectId.equals(other.projectId);
    }
}