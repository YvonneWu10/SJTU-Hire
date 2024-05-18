package com.sjtuhirebackend.serviceimpl;

import com.sjtuhirebackend.dao.CandPostDao;
import com.sjtuhirebackend.dao.CandidateDao;
import com.sjtuhirebackend.dao.PostDao;
import com.sjtuhirebackend.dao.ProjectDao;
import com.sjtuhirebackend.entity.CandPost;
import com.sjtuhirebackend.entity.CandPostPK;
import com.sjtuhirebackend.entity.Candidate;
import com.sjtuhirebackend.entity.Project;
import com.sjtuhirebackend.service.CandidateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;

@Service
@Slf4j
@Scope("prototype")
public class CandidateServiceImpl implements CandidateService {
    @Autowired
    private CandidateDao candidateDao;
    @Autowired
    private PostDao postDao;
    @Autowired
    private CandPostDao candPostDao;
    @Autowired
    private ProjectDao projectDao;

    public String getCandNameByCandId(String id) {
        Candidate res = candidateDao.getCandidateByCandId(id);
        if (res != null) {
            return res.getCandName();
        }
        return null;
    }

    public List<Candidate> getCandidates(){
        return candidateDao.getCandidates();
    }
    public Candidate getCandidatesByCandId(String candId){
        return candidateDao.getCandidateByCandId(candId);
    }
    public List<Candidate> getCandidatesByCandName(String candName){
        return candidateDao.getCandidatesByCandName(candName);
    }
    public List<Candidate> getCandidatesByCandAge(int candAge){
        return candidateDao.getCandidatesByCandAge(candAge);
    }
    public List<Candidate> getCandidatesByCandGender(String candGender){
        return candidateDao.getCandidatesByCandGender(candGender);
    }
    public Candidate getCandidatesByCandPhone(String candPhone){
        return candidateDao.getCandidatesByCandPhone(candPhone);
    }
    public Candidate getCandidatesByCandMail(String candMail){
        return candidateDao.getCandidatesByCandMail(candMail);
    }
    public List<Candidate> getCandidatesByCandProvince(String candProvince){
        return candidateDao.getCandidatesByCandProvince(candProvince);
    }
    public List<Candidate> getCandidatesByCandMentor(String candMentor){
        return candidateDao.getCandidatesByCandMentor(candMentor);
    }
    public List<Candidate> getCandidatesByCandPaperNum(int candPaperNum){
        return candidateDao.getCandidatesByCandPaperNum(candPaperNum);
    }
    public List<Candidate> getCandidatesByCandDegree(String candDegree){
        return candidateDao.getCandidatesByCandDegree(candDegree);
    }
    public List<Candidate> getCandidatesByCandUniversity(String candUniversity){
        return candidateDao.getCandidatesByCandUniversity(candUniversity);
    }
    public List<Candidate> getCandidatesByCandMajor(String candMajor){
        return candidateDao.getCandidatesByCandMajor(candMajor);
    }
    public List<Candidate> getCandidatesByCandWorkYear(int candWorkYear){
        return candidateDao.getCandidatesByCandWorkYear(candWorkYear);
    }
    public List<Candidate> getCandidatesByCandWorkYearAfter(int candWorkYear){
        return candidateDao.getCandidatesByCandWorkYearAfter(candWorkYear);
    }
    public List<Candidate> getCandidatesByCandExpectedSalary(int candExpectedSalary){
        return candidateDao.getCandidatesByCandExpectedSalary(candExpectedSalary);
    }
    public List<Candidate> getCandidatesByCandExpectedSalaryBetween(int lb, int ub){
        return candidateDao.getCandidatesByCandExpectedSalaryBetween(lb, ub);
    }
    public List<Candidate> getAllCandidatesAvailable(int HRId){
        List<Integer> responsiblePostId = postDao.getPostIdByHRId(HRId);
        if (responsiblePostId.isEmpty()){
            return candidateDao.getCandidates();
        }
        // return all candpost given post id
        List<CandPost> responsibleRecords = candPostDao.getCandPostByPostIdIn(responsiblePostId);
        System.out.print(responsibleRecords);
        if (responsibleRecords.isEmpty()) {
            return candidateDao.getCandidates();
        }
        List<String> candIdList = (responsibleRecords.stream().map(CandPost::getBiId).toList()).stream().map(CandPostPK::getCandId).toList();
        return candidateDao.getCandidateByCandIdNotIn(candIdList);
    }

    public Map<String, Object> getCandInfoByCandId(String id) {
        Candidate candidate = candidateDao.getCandidateByCandId(id);
        List<Project> projects = projectDao.getProjectByCandId(id);

        Map<String, Object> ans = new HashMap<>();
        ans.put("candidate", candidate);
        ans.put("projects", projects);

        return ans;
    }

    public List<String> getCandIdByCandName(String candName){
        return candidateDao.getCandIdByCandName(candName);
    }

    public void editCandidateInfo(String id, Map<String, Object> values, List<Integer> deletedProjects) {
        for (int projectId : deletedProjects) {
            projectDao.deleteProject(projectId);
        }

        Candidate candidate = candidateDao.getCandidateByCandId(id);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        for (Map.Entry<String, Object> entry : values.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();

            if (key.matches("^[1-9]\\d*$")) {
                Project project = new Project();
                Map<String, Object> value_map = (Map<String, Object>) value;

                int projectId = Integer.parseInt(key);
                if (projectId <= 5000) {
                    project.setProjectId(projectId);
                }

                project.setProjectName((String) value_map.get("projectName"));
                project.setRole((String) value_map.get("projectRole"));
                project.setProjectAchievement((Integer) value_map.get("projectAchievement"));
                project.setDescription((String) value_map.get("projectDescription"));
                project.setParticipant(id);

                if (value_map.get("projectStartDate") != null) {
                    LocalDate startLocalDate = LocalDate.parse(value_map.get("projectStartDate").toString().substring(0, 10), formatter);
                    java.util.Date startDate = Date.from(startLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
                    project.setStartDate(startDate);
                } else {
                    project.setStartDate(null);
                }
                if (value_map.get("projectEndDate") != null) {
                    LocalDate endLocalDate = LocalDate.parse(value_map.get("projectEndDate").toString().substring(0, 10), formatter);
                    java.util.Date endDate = Date.from(endLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
                    project.setEndDate(endDate);
                } else {
                    project.setEndDate(null);
                }

                projectDao.saveProject(project);
            } else {
                switch (key) {
                    case "candidateName" -> candidate.setCandName((String) value);
                    case "candidateId" -> candidate.setCandId((String) value);
                    case "candidateGender" -> candidate.setCandGender((String) value);
                    case "candidateAge" -> candidate.setCandAge((Integer) value);
                    case "candidatePhone" -> candidate.setCandPhone((String) value);
                    case "candidateMail" -> candidate.setCandMail((String) value);
                    case "candidateProvince" -> candidate.setCandProvince((String) value);
                    case "candidateDegree" -> candidate.setCandDegree((String) value);
                    case "candidateUniversity" -> candidate.setCandUniversity((String) value);
                    case "candidateMajor" -> candidate.setCandMajor((String) value);
                    case "candidateGPA" -> candidate.setCandGPA((Double) value);
                    case "candidateMentor" -> candidate.setCandMentor((String) value);
                    case "candidatePaperNum" -> candidate.setCandPaperNum((Integer) value);
                    case "candidateWorkYear" -> candidate.setCandWorkYear((Integer) value);
                    case "candidateExpectedSalary" -> candidate.setCandExpectedSalary((Integer) value);
                    default -> System.out.println("editCandidateInfo unknown key:" + key);
                }
            }
        }

        candidateDao.saveCandidate(candidate);
    }
}
