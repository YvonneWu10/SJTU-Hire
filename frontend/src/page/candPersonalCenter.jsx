import '../css/global.css'

import { Button, Card } from "antd";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { searchCandidateInfo } from "../service/candidate";
import CandidateDescription from "../components/candidate_description";
import CandidateHeader from "../components/candidate_header";


export default function CandPersonalCenterPage() {
    const [candidateInfo, setCandidateInfo] = useState(null);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

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

    const editOnClick = () => {
        navigate("/candidate_view/PersonalCenterEdit");
    }

    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader />
            )
        }, {
            children: (
                <div className="flex">
                    <Card className="card-container">
                        <Button onClick={ editOnClick } className={"ant-button-primary"}
                                style={{ position: 'absolute', right: 180, top: 70, width: 100, height: 50, fontSize: 18, letterSpacing: 4 }} >
                            编辑
                        </Button>
                        { candidateInfo && <CandidateDescription candidate={candidateInfo} projectList={projects}/> }
                    </Card>
                </div>
            )
        }
    );
}