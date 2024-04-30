package com.sjtuhirebackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;

import java.io.Serializable;

@Embeddable
@Table(name = "cand_post")
public class CandPostPK implements Serializable {
    @Column(name = "candId")
    private String candId;
    @Column(name = "postId")
    private Integer postId;
    public void setCandId(String candId){
        this.candId = candId;
    }
    public void setPostId(Integer postId){
        this.postId = postId;
    }
    public String getCandId(){
        return candId;
    }

    public Integer getPostId(){
        return postId;
    }
    @Override
    public int hashCode(){
        final int prime = 31;
        int result = 1;
        result = prime * result + ((candId == null) ? 0 : candId.hashCode());
        result = prime * result + ((postId == null) ? 0 : postId.hashCode());
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
        CandPostPK other = (CandPostPK) obj;
        if (candId == null){
            if (other.candId != null)
                return false;
        } else if (!candId.equals(other.candId))
            return false;

        if (postId == null){
            return other.postId == null;
        } else return postId.equals(other.postId);
    }
}