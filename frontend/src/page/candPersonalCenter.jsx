import '../css/global.css'

import type {MenuProps} from 'antd';
import {Avatar, Button, Card, Menu} from "antd";
import {useEffect, useState} from "react";

import {Link, useNavigate} from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import {UserOutlined} from "@ant-design/icons";
import {searchCandidateUsername, searchCandidateInfo} from "../service/candidate";
import CandidateDescription from "../components/candidate_description";


const candidateMenuItems: MenuProps['items'] = [
    {
        label: (<Link to="/candidate_view/SearchPost">岗位查找</Link>),
        key: 'postSearch',
    },
    {
        label: (<Link to="/candidate_view/SearchCompany">公司查找</Link>),
        key: 'companySearch',
    },
    {
        label: (<Link to="/candidate_view/Delivery">投递列表</Link>),
        key: 'deliveryList',
    },
];


export default function CandPersonalCenterPage() {
    const [candidateInfo, setCandidateInfo] = useState(null);
    const [projects, setProjects] = useState([]);
    const [user, setUser] = useState("");
    const [curMenu, setCurMenu] = useState(null);
    const navigate = useNavigate();

    const getCandidateInfo = async () => {
        let resCandidateInfo = await searchCandidateInfo();
        // console.log(`resCandidateInfo in CandPersonalCenterPage: ${JSON.stringify(resCandidateInfo, null, 2)}`);
        let resCandidate = resCandidateInfo.candidate;
        let resProjects = resCandidateInfo.projects;
        setCandidateInfo(resCandidate);
        setProjects(resProjects);
    };

    const getUserName = async () => {
        // console.log(`Entering getUserName`);
        let resUser = await searchCandidateUsername();
        setUser(resUser);
    };

    useEffect(() => {
        getUserName();
        getCandidateInfo();
    }, []);

    const menuOnClick: MenuProps['onClick'] = (event) => {
        setCurMenu(event.key);
    };

    const personalCenterOnClick = () => {
        navigate("/candidate_view/PersonalCenter");
    };

    return PrivateLayout("candidate", {
            header: (
                <div>
                    <Menu onClick={menuOnClick} selectedKeys={[curMenu]} mode="horizontal" style={{position: 'absolute', top: 15, left: 30}}
                          items={candidateMenuItems}/>
                    <Avatar size="large" icon={<UserOutlined/>} style={{position: 'absolute', top: 25, right: 170}}/>
                    { user && <span className="avatar-subtitle" style={{position: 'absolute', top: 65, right: 160}}>您好，{user}</span> }
                    <Button className={"ant-button-primary"} style={{position: 'absolute', top: 40, right: 50}} onClick={personalCenterOnClick}>个人中心</Button>
                </div>
            )
        }, {
            children: (
                <div className="flex">
                    <Card className="card-container">
                        { candidateInfo && <CandidateDescription candidate={candidateInfo} projectList={projects}/> }
                    </Card>
                </div>
            )
        }
    );
}