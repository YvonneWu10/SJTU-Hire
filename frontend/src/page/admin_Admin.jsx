import React, { useState, useEffect } from 'react';
import { Layout, Input, Card, Space } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { searchPosts } from "../service/post";
import PostList from "../components/post_list";
import SidebarLayout from './admin_SidebarLayout'; // 确保路径正确

const { Search } = Input;

const AdminPage = () => {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const postName = searchParams.get("postName") || "";
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 30;

    useEffect(() => {
        const getPosts = async () => {
            const { items, total } = await searchPosts(postName, pageIndex, pageSize);
            setPosts(items);
            setTotalPage(total);
        };
        getPosts();
    }, [postName, pageIndex, pageSize]);

    const handleSearch = (value) => {
        setSearchParams({ postName: value, pageIndex: 1, pageSize: 30 });
    };

    const handlePageChange = (page) => {
        setSearchParams({ postName, pageIndex: page, pageSize });
    };

    return (
        <SidebarLayout>
            <Card className="card-container">
                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    <Search placeholder="输入岗位名" onSearch={handleSearch} enterButton size="large" />
                    <PostList posts={posts} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex} onPageChange={handlePageChange} />
                </Space>
            </Card>
        </SidebarLayout>
    );
};

export default AdminPage;
