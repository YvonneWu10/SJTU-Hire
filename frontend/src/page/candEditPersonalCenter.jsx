import '../css/global.css'

import { Card } from "antd";
import { useEffect, useState } from "react";

import { PrivateLayout } from "../components/layout";
import { searchCandidateInfo } from "../service/candidate";
import CandidateHeader from "../components/candidate_header";
import CandidateBasicInfoForm from "../components/candidateBasicInfo_form";

// 求职者个人中心-基本信息编辑页
export default function CandEditPersonalCenterPage() {
    const [candidateInfo, setCandidateInfo] = useState(null);
    const [projects, setProjects] = useState([]);

    const getCandidateInfo = async () => {
        let resCandidateInfo = await searchCandidateInfo();
        let resCandidate = resCandidateInfo.candidate;
        let resProjects = resCandidateInfo.projects;
        setCandidateInfo(resCandidate);
        setProjects(resProjects);
    };

    useEffect(() => {
        getCandidateInfo();
    }, []);

    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader />
            )
        }, {
            children: (
                <div className="flex">
                    <Card className="card-container">
                        { candidateInfo && <CandidateBasicInfoForm candidate={candidateInfo} projectList={projects}/> }
                    </Card>
                </div>
            )
        }
    );
}