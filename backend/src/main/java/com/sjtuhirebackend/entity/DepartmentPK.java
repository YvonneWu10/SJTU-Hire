package com.sjtuhirebackend.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Embeddable
@Table(name = "department")
public class DepartmentPK implements Serializable {
    @Column(name = "companyId")
    private Integer companyId;
    @Column(name = "departmentId")

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer departmentId;
    public void setCompanyId(int companyId){
        this.companyId = companyId;
    }
    public void setDepartmentId(int departmentId){
        this.departmentId = departmentId;
    }
    public int getCompanyId(){
        return companyId;
    }
    public int getDepartmentId(){
        return departmentId;
    }
    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + ((departmentId == null) ? 0 :(departmentId.hashCode()));
        result = prime * result + ((companyId == null) ? 0 :(companyId.hashCode()));
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
        DepartmentPK other = (DepartmentPK) obj;
        if (companyId == null){
            if (other.companyId != null)
                return false;
        } else if (!companyId.equals(other.companyId))
            return false;

        if (departmentId == null){
            return other.departmentId == null;
        } else return departmentId.equals(other.departmentId);
    }
}