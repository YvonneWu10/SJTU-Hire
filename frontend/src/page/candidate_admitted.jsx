import '../css/global.css'

import { Card, Space} from "antd";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import {searchDeliveredEndedAdmittedPosts} from "../service/candPost";
import CandidateHeader from "../components/candidate_header";
import DeliveredEndedAdmittedPostList from "../components/deliveredEndedAdmittedPost_list";

// 已录取的岗位页面
export default function CandidateAdmittedPage() {
    const [posts, setPosts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [candPosts, setCandPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 6;

    const getAdmittedPosts = async () => {
        let resAdmittedPosts = await searchDeliveredEndedAdmittedPosts(pageIndex, pageSize, "AdmittedPost");
        let resPosts = resAdmittedPosts.posts;
        let resCompanies = resAdmittedPosts.companies;
        let resCandPosts = resAdmittedPosts.candPosts;
        let totalPage = resAdmittedPosts.total;
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
        getAdmittedPosts();
    }, [pageIndex, pageSize]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader initialMenu={'admitted'} />
            )
        }, {
            children: (
                <div className="center-container">
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <DeliveredEndedAdmittedPostList posts={posts} companies={companies} candPosts={candPosts}
                                                    pageSize={pageSize} total={totalPage * pageSize}
                                                    current={pageIndex} onPageChange={handlePageChange}
                                                    cardType={"AdmittedPostCard"} />
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}