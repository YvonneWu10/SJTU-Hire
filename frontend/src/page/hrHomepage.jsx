import {Avatar, Button, Card, Select, Space} from "antd";
import React, { useEffect, useState } from "react";

import {Link, useSearchParams} from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import CandPostList from "../components/cand_post_list";

import { Input } from 'antd';
import {retResponsiblePosts, searchCandPost} from "../service/candPost";
import type {MenuProps, SelectProps} from 'antd';
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
import {retPostCities} from "../service/post";
const { Search } = Input;

export default function CandPostPage() {
    const [candPosts, setCandPosts] = useState([]);
    const [cands, setCands] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [postNames, setPostNames] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const candName = searchParams.get("candName") || "";
    const postName = searchParams.get("postName") || "";
    // const submissionStage = searchParams.get("submissionStage") || " ";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;

    const getCandPostInfo = async () => {
        let CandPostInfo = await searchCandPost(candName, postName, pageIndex, pageSize);
        console.log(CandPostInfo);
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

    useEffect(() => {
        getResponsiblePostName();
    }, []);

    const postOptions: SelectProps['options'] = postNames.map(postName => ({
        label: postName,
        value: postName
    }));

    const getResponsiblePostName = async () => {
        let res = await retResponsiblePosts();
        setPostNames(res);
    };

    const handleCandSearch = (candName) => {
        setSearchParams({
            "candName": candName,
            "pageIndex": 1,
            "pageSize": 10
        });
    };

    const handlePostSearch = (postName) => {
        setSearchParams({
            "postName": postName,
            "pageIndex": 1,
            "pageSize": 10
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
                <Card className="scroll-card-container">
                    <Space direction="vertical" size="large" style={{width: "100%"}}>
                        <div className="input-select-container">
                            <Search placeholder="输入应聘者姓名" onSearch={handleCandSearch} enterButton size="middle"
                                    style={{width: '30%'}}/>
                            <Select allowClear style={{width: '30%'}} placeholder="请选择应聘岗位"
                                    onChange={handlePostSearch}
                                    options={postOptions}/>
                        </div>
                        <CandPostList cands={cands} posts={posts} candPosts={candPosts} pageSize={pageSize}
                                      total={totalPage * pageSize} current={pageIndex} onPageChange={handlePageChange}/>
                    </Space>
                </Card>
            </div>
        )
    }
    );

}