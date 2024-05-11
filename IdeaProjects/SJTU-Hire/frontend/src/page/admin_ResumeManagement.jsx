// ResumeManagement.js
import React, { useState, useEffect } from 'react';
import {Button, Table, Space, Input, Select, Pagination} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {useSearchParams, useNavigate} from "react-router-dom";
import {AdminsearchCandPost} from "../service/candPost"; // 确保路径正确

const { Search } = Input;

const ResumeManagement = () => {
    const navigate = useNavigate();
    const [resumes, setResumes] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const candName = searchParams.get("candName") || "";
    const postName = searchParams.get("postName") || "";
    const submissionStage = searchParams.get("submissionStage") || "";

    const getResumes = async() => {
        console.log("In search Resumes");
        let resResumes = await AdminsearchCandPost(pageIndex, pageSize, candName, postName);
        let resumes = resResumes.items;
        let totalPage = resResumes.total;
        setResumes(resumes);
        setTotalPage(totalPage);
        // console.log("totalPage:", totalPage);
    }

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getResumes();
    }, [pageIndex, pageSize, candName, postName]);


    const handleCandSearch = (candName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("candName", candName);
        setSearchParams(currentParams);
    };

    const handlePostSearch = (postName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("postName", postName);
        setSearchParams(currentParams);
    };

    const handleTableChange = (pagination) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", pagination.current);
        currentParams.set("pageSize", pagination.pageSize);
        setSearchParams(currentParams);
    };


    // Define the columns for the resumes table
    const columns = [
        { title: '姓名', dataIndex: 'candName', key: 'name', width: '15%' },
        { title: '应聘岗位', dataIndex: 'postName', key: 'position', width: '20%' },
        { title: '投递状态', dataIndex: 'submissionStage', key: 'position', width: '20%' },
        { title: '投递日期', dataIndex: 'submissionDate', key: 'position', width: '20%' },
        // Add more columns as needed
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/*<Button onClick={() => viewResume(record.id)}>查看</Button>*/}
                    {/*<Button type="primary" onClick={() => editResume(record.id)}>编辑</Button>*/}
                    {/*<Button danger onClick={() => deleteResume(record.id)}>删除</Button>*/}
                    <Button type="default">查看</Button>
                    <Button type="default">编辑</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    // // TODO: Implement functions for viewing, editing, and deleting resumes
    // const viewResume = (id) => {
    //     // Logic to view resume details
    // };
    //
    // const editResume = (id) => {
    //     // Logic to edit resume
    // };
    //
    // const deleteResume = (id) => {
    //     // Logic to delete resume
    // };

    return (
        <SidebarLayout>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Search placeholder="输入用户名" onSearch={handleCandSearch} enterButton size="large" />
                        <Search placeholder="输入岗位名" onSearch={handlePostSearch} enterButton size="large" />
                    </div>
                    {/*<Button type="primary" style={{ height: '40px' }}>添加投递信息</Button>*/}
                </div>
                <Table
                    columns={columns}
                    dataSource={resumes}
                    rowKey="id"
                    pagination={{ current: pageIndex, pageSize: pageSize, total: totalPage * pageSize }}
                    onChange={handleTableChange}
                />
            </div>
        </SidebarLayout>
    );
};

export default ResumeManagement;
