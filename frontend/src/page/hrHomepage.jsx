import {Avatar, Button, Card, Space} from "antd";
import React, { useEffect, useState } from "react";

import {Link, useSearchParams} from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import CandPostList from "../components/cand_post_list";

import { Input } from 'antd';
import {searchCandPost} from "../service/candPost";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {
    AppstoreOutlined, BarChartOutlined,
    HomeOutlined,
    InboxOutlined,
    MailOutlined, ProfileOutlined,
    SettingOutlined, ShopOutlined,
    UserOutlined, UserSwitchOutlined
} from '@ant-design/icons';
import {Header} from "antd/es/layout/layout";
import HRMenu from "../components/hr_menu";
const { Search } = Input;


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
        onTitleClick: <Link to="/hr_view/findCandidates"/>,
    },
];

const rightMenuItems: MenuProps['items'] = [
    {
        label: '个人中心',
        key: 'center'
    }
];

export default function CandPostPage() {
    const [candPosts, setCandPosts] = useState([]);
    const [cands, setCands] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const candName = searchParams.get("candName") || " ";
    const postName = searchParams.get("postName") || " ";
    // const submissionStage = searchParams.get("submissionStage") || " ";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 30;

    const getCandPostInfo = async () => {
        let CandPostInfo = await searchCandPost(candName, postName, pageIndex, pageSize);

        let cands = CandPostInfo.cands;
        let posts = CandPostInfo.posts;
        let candPosts = CandPostInfo.candPost;
        let totalPage = CandPostInfo.total;
        setCandPosts(candPosts);
        setCands(cands);
        setPosts(posts);
        setTotalPage(totalPage);
    };

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getCandPostInfo();
    }, [candName, postName, pageIndex, pageSize]);

    const handleSearch = (candName, postName) => {
        setSearchParams({
            "candName": candName,
            "postName": postName,
            "pageIndex": 1,
            "pageSize": 30
        });
    };

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
        // setSearchParams({ ...searchParams, pageIndex: page - 1 });
    }

    return PrivateLayout("HR", {
        header:(
        <div>
            <HRMenu></HRMenu>
        </div>
        )
        }, {
        children: (
            <div>
                <Card className="card-container">
                    <Space direction="vertical" size="large" style={{width: "100%"}}>
                        <Search placeholder="输入姓名" onSearch={handleSearch} enterButton size="large"/>
                        <CandPostList cands={cands} posts={posts} candPosts={candPosts} pageSize={pageSize}
                                      total={totalPage * pageSize} current={pageIndex} onPageChange={handlePageChange}/>
                    </Space>
                </Card>
            </div>
        )
    }
    );

}