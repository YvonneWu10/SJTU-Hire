// JobManagement.js
import React, { useState, useEffect } from 'react';
import { Button, Table, Space } from 'antd';
import SidebarLayout from './admin_SidebarLayout'; // 确保路径正确

const JobManagement = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // TODO: Load job data from the backend
    }, []);

    // TODO: Implement job CRUD operations

    const columns = [
        // Define table columns for job data
        { title: '岗位名称', dataIndex: 'name', key: 'name' },
        // Add more columns as needed
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary">编辑</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <SidebarLayout>
            <div>
                <Button type="primary" style={{ marginBottom: 16 }}>
                    添加岗位
                </Button>
                <Table columns={columns} dataSource={jobs} rowKey="id" />
            </div>
        </SidebarLayout>
    );
};

export default JobManagement;
