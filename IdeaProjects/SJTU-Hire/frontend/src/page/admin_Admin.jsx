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

    const getPosts = async () => {
        let resPosts = await searchPosts(postName, pageIndex, pageSize, "","","");
        let posts = resPosts.items;
        let totalPage = resPosts.total;
        setPosts(posts);
        setTotalPage(totalPage);
    };

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getPosts();
    }, [pageIndex, pageSize, postName]);

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
