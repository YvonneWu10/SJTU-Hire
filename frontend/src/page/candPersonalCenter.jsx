import '../css/global.css'

import type {MenuProps} from 'antd';
import {Avatar, Button, Card, Menu} from "antd";
import {useEffect, useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import {UserOutlined} from "@ant-design/icons";
import {searchCandidateUsername, searchCandidateInfo} from "../service/candidate";
import CandidateDescription from "../components/candidate_description";
import CandidateHeader from "../components/candidate_header";


export default function CandPersonalCenterPage() {
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
                    <Card className="scroll-card-container">
                        { candidateInfo && <CandidateDescription candidate={candidateInfo} projectList={projects}/> }
                    </Card>
                </div>
            )
        },
        "scroll-footer"
    );
}