import '../css/global.css'

import {Card, Menu, Select, Space} from "antd";
import { useEffect, useState } from "react";
import { getCandPostById } from "../service/candPost";

import {useParams, useSearchParams} from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import CandPostDetails from "../components/candPost_detail";
import type {MenuProps} from "antd";
import {getCandInfoByCandId} from "../service/hr_candidate_view";
import HRCandDetail from "../components/hr_cand_detail";
import HRMenu from "../components/hr_menu";
import {getHRPosts, getPosts} from "../service/hr_post_view";
import PostList from "../components/post_list";
import Search from "antd/es/input/Search";
import HRPostList from "../components/hr_post_list";

const menuItems: MenuProps['items'] = [
    {
        label: '首页',
        key: 'homepage',
    },
    {
        label: '职位管理',
        key: 'postManagement',
    },
    {
        label: '找人',
        key: 'hire',
    },
];

const rightMenuItems: MenuProps['items'] = [
    {
        label: '个人中心',
        key: 'center'
    }
];

export default function HRPostPage() {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const postName = searchParams.get("postName") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 25;

    const getPosts = async () => {
        let resPosts = await getHRPosts(pageIndex, pageSize, postName);
        let posts = resPosts.items;
        let totalPage = resPosts.total;
        console.log(posts);
        setPosts(posts);
        setTotalPage(totalPage);
    }

    useEffect(() => {
        getPosts();
    }, [pageIndex, pageSize, postName]);

    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const handleSearch = (postName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("postName", postName);
        setSearchParams(currentParams);
    };

    return PrivateLayout("HR", {
        header: (
            <HRMenu></HRMenu>
        )
        }, {
            children: (
                <div>
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <Search placeholder="输入岗位名" onSearch={handleSearch} enterButton size="middle"
                                    style={{width: '100%'}} />
                            <HRPostList posts={posts} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex}
                                      onPageChange={handlePageChange}/>
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}