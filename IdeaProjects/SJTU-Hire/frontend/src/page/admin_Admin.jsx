import '../css/Statistics.css';  // 确保CSS文件路径正确
import React, { useState, useEffect } from 'react';
import {Input, Card, Space, Row, Col, Statistic} from 'antd';
import { useSearchParams } from 'react-router-dom';
import { AdminsearchPosts } from "../service/post";
import PostList from "../components/post_list";
import SidebarLayout from './admin_SidebarLayout';
import {ClockCircleTwoTone, ContainerTwoTone, EyeTwoTone, FrownTwoTone, IdcardTwoTone} from "@ant-design/icons";
import {PostProgress} from "./statistics";

const { Search } = Input;

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 25;
    const postName = searchParams.get("postName") || "";
    const city = searchParams.get("city") || "";
    const workType = searchParams.get("workType") || "";
    const workStyle = searchParams.get("workStyle") || "";

    const getPosts = async () => {
        console.log("In search Posts");
        let resPosts = await AdminsearchPosts(pageIndex, pageSize, postName, city, workType, workStyle);
        let posts = resPosts.items;
        let totalPage = resPosts.total;
        setPosts(posts);
        setTotalPage(totalPage);
        console.log("API Response:", resPosts);
    };

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getPosts();
    }, [pageIndex, pageSize, postName, city, workType, workStyle]);

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

    // 示例数据，您需要根据实际从后端获取
    const PostInProgressData = 0.72

    return (
        <SidebarLayout>
            <Card bordered={false} style={{ marginBottom: '10px'}}>
                <div style={{fontWeight: 'bold', fontSize: '17px'}}>核心指标</div>
                <Row gutter={6}>
                    <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
                        <Card bordered={false} style={{  boxShadow: "none"}}>
                            <EyeTwoTone /> 今日访问量
                            <Statistic value={12} valueStyle={{ fontSize: '40px', fontWeight: 'bold' }} />
                            <div className="small-text">截至2024年5月20日</div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
                        <Card bordered={false} style={{  boxShadow: "none"}}>
                            <ContainerTwoTone /> 新增岗位数
                            <Statistic value={13} valueStyle={{ fontSize: '40px', fontWeight: 'bold' }} />
                            <div className="small-text">截至2024年5月20日</div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
                        <Card bordered={false} style={{  boxShadow: "none"}}>
                            <IdcardTwoTone /> 新增用户数
                            <Statistic value={14} valueStyle={{ fontSize: '40px', fontWeight: 'bold' }} />
                            <div className="small-text">截至2024年5月20日</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} style={{  boxShadow: "none"}}>
                            <ClockCircleTwoTone /> 进程中岗位数
                            <PostProgress data={PostInProgressData}></PostProgress>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Card className="card-container" style={{ maxWidth: "1310px", width: "100%" }}>
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Search placeholder="输入岗位名" onSearch={handleSearch} enterButton size="large" />
                    <PostList posts={posts} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex} onPageChange={handlePageChange} columns ={5} gutter ={16} />
                </Space>
            </Card>
        </SidebarLayout>
    );
};

export default AdminPage;
