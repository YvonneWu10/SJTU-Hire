import '../css/global.css'

import { Card, Space} from "antd";
import { useEffect, useState } from "react";
import { getPostById } from "../service/post";

import { useParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import PostDetails from "../components/post_details";
import CompanyCard from "../components/company_card";
import CandidateHeader from "../components/candidate_header";

// 岗位详细情况页面
export default function PostPage() {
    const [post, setPost] = useState(null);
    const [company, setCompany] = useState(null);
    const [department, setDepartment] = useState(null);
    const [timeout, setTimeout] = useState(null);
    const [delivered, setDelivered] = useState(null);
    const [ended, setEnded] = useState(null);
    const [invited, setInvited] = useState(null);
    const [admitted, setAdmitted] = useState(null);

    let { postId } = useParams();

    const getPost = async () => {
        let resPostInfo = await getPostById(postId);
        console.log(`resPostInfo: `, JSON.stringify(resPostInfo, null, 2));
        let resPost = resPostInfo.post;
        let resCompany = resPostInfo.company;
        let resDepartment = resPostInfo.department;
        let resTimeout = resPostInfo.timeout;
        let resDelivered = resPostInfo.delivered;
        let resEnded = resPostInfo.ended;
        let resInvited = resPostInfo.invited;
        let resAdmitted = resPostInfo.admitted;
        console.log(`resTimeout: ${resTimeout}, resDelivered: ${resDelivered}`);
        setPost(resPost);
        setCompany(resCompany);
        setDepartment(resDepartment);
        setTimeout(resTimeout);
        setDelivered(resDelivered);
        setEnded(resEnded);
        setInvited(resInvited);
        setAdmitted(resAdmitted);
    }

    useEffect(() => {
        getPost();
    }, []);

    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader />
            )
        }, {
            children: (
                <Card className="card-container">
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {post && <PostDetails post={ post } department={ department } timeout={ timeout }
                                              delivered={ delivered } ended={ ended } invited={ invited }
                                              admitted={ admitted } />}
                    </Space>
                    <div style={{ width: 300, position: 'absolute', top: 200, right: 70 }}>{company && <CompanyCard company={company} /> }</div>
                </Card>
            )
        }
    );
}