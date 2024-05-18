import '../css/global.css'

import { Card, Space} from "antd";
import {useEffect, useState} from "react";

import { useSearchParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { searchInvitedPosts } from "../service/candPost";
import CandidateHeader from "../components/candidate_header";
import InvitedPostList from "../components/invitedPost_list";


export default function CandidateInvitedPage() {
    const [posts, setPosts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [candPosts, setCandPosts] = useState([]);
    const [timeout, setTimeout] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 6;

    const getDeliveredPosts = async () => {
        let resInvitedPosts = await searchInvitedPosts(pageIndex, pageSize);
        let resPosts = resInvitedPosts.posts;
        let resCompanies = resInvitedPosts.companies;
        let resCandPosts = resInvitedPosts.candPosts;
        let resTimeout = resInvitedPosts.timeout;
        let totalPage = resInvitedPosts.total;
        setPosts(resPosts);
        setCompanies(resCompanies);
        setCandPosts(resCandPosts);
        setTimeout(resTimeout);
        setTotalPage(totalPage);
    };

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getDeliveredPosts();
    }, [pageIndex, pageSize]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader initialMenu={'invited'} />
            )
        }, {
            children: (
                <div className="center-container">
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <InvitedPostList posts={posts} companies={companies} candPosts={candPosts}
                                             timeout={timeout} pageSize={pageSize} total={totalPage * pageSize}
                                             current={pageIndex} onPageChange={handlePageChange}
                                             cardType={"InvitedPostCard"} />
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}