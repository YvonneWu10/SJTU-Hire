import '../css/global.css'

import {Avatar, Button, Card, List, Menu, Space} from "antd";
import { useEffect, useState } from "react";
import { getPostById } from "../service/post";

import {Link, useNavigate, useParams} from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import PostDetails from "../components/post_details";
import {UserOutlined} from "@ant-design/icons";
import type {MenuProps} from "antd";
import {searchCandidateUsername} from "../service/candidate";
import CompanyCard from "../components/company_card";


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


export default function PostPage() {
    const [post, setPost] = useState(null);
    const [company, setCompany] = useState(null);
    const [department, setDepartment] = useState(null);
    const [user, setUser] = useState("");
    const [curMenu, setCurMenu] = useState(null);
    const navigate = useNavigate();

    let { postId } = useParams();

    const getUserName = async () => {
        // console.log(`Entering getUserName`);
        let resUser = await searchCandidateUsername();
        setUser(resUser);
    };

    const getPost = async () => {
        let resPostInfo = await getPostById(postId);
        let resPost = resPostInfo.post;
        let resCompany = resPostInfo.company;
        let resDepartment = resPostInfo.department;
        setPost(resPost);
        setCompany(resCompany);
        setDepartment(resDepartment);
    }

    useEffect(() => {
        getUserName();
        getPost();
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
                <Card className="card-container">
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {post && <PostDetails post={ post } department={ department } />}
                    </Space>
                    <div style={{ width: 300, position: 'absolute', top: 200, right: 70 }}>{company && <CompanyCard company={company} /> }</div>
                </Card>
            )
        }
    );
}