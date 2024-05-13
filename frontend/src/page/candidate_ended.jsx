import '../css/global.css'

import { Card, Space} from "antd";
import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { searchDeliveredEndedPosts } from "../service/candPost";
import CandidateHeader from "../components/candidate_header";
import DeliveredEndedPostList from "../components/deliveredEndedPost_list";


export default function CandidateEndedPage() {
    const [posts, setPosts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [candPosts, setCandPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 6;

    const getEndedPosts = async () => {
        let resEndedPosts = await searchDeliveredEndedPosts(pageIndex, pageSize, "EndedPost");
        let resPosts = resEndedPosts.posts;
        let resCompanies = resEndedPosts.companies;
        let resCandPosts = resEndedPosts.candPosts;
        let totalPage = resEndedPosts.total;
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
        getEndedPosts();
    }, [pageIndex, pageSize]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader initialMenu={'ended'} />
            )
        }, {
            children: (
                <div className="center-container">
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <DeliveredEndedPostList posts={posts} companies={companies} candPosts={candPosts}
                                                           pageSize={pageSize} total={totalPage * pageSize}
                                                           current={pageIndex} onPageChange={handlePageChange}
                                                           cardType={"EndedPostCard"} />
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}