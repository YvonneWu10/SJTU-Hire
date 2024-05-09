import '../css/global.css'

import { Card, Space} from "antd";
import {useEffect, useState} from "react";

import { useSearchParams } from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import DeliveredPostList from "../components/deliveredEndedInvitedPost_list";
import {searchDeliveredEndedInvitedPosts} from "../service/candPost";
import CandidateHeader from "../components/candidate_header";
import DeliveredEndedInvitedPostList from "../components/deliveredEndedInvitedPost_list";


export default function CandidateDeliveredPage() {
    const [posts, setPosts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [candPosts, setCandPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 6;

    const getDeliveredPosts = async () => {
        let resDeliveredPosts = await searchDeliveredEndedInvitedPosts(pageIndex, pageSize, "DeliveredPost");
        let resPosts = resDeliveredPosts.posts;
        let resCompanies = resDeliveredPosts.companies;
        let resCandPosts = resDeliveredPosts.candPosts;
        let totalPage = resDeliveredPosts.total;
        setPosts(resPosts);
        setCompanies(resCompanies);
        setCandPosts(resCandPosts);
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
                <CandidateHeader initialMenu={'delivered'} />
            )
        }, {
            children: (
                <div className="center-container">
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <DeliveredEndedInvitedPostList posts={posts} companies={companies} candPosts={candPosts}
                                                           pageSize={pageSize} total={totalPage * pageSize}
                                                           current={pageIndex} onPageChange={handlePageChange}
                                                           cardType={"DeliveredPostCard"} />
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}