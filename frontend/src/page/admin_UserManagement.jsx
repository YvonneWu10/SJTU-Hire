// UserManagement.js
import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, Form, Input } from 'antd';
import SidebarLayout from './admin_SidebarLayout'; // 确保路径正确

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        // TODO: Fetch users data from backend
        // 模拟数据加载，实际项目中应该从后端获取数据
    }, []);

    // Define the columns for the users table
    const columns = [
        { title: '用户名', dataIndex: 'username', key: 'username' },
        { title: '密码', dataIndex: 'password', key: 'password', render: text => '******' },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)}>编辑</Button>
                    <Button danger onClick={() => deleteUser(record.id)}>删除</Button>
                </Space>
            ),
        },
    ];

    const showModal = (user) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // TODO: Submit the changes to the backend
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteUser = (id) => {
        // TODO: Implement delete logic
        // Typically involves sending a DELETE request to the backend
    };

    return (
        <SidebarLayout>
            <div>
                <Button type="primary" style={{ marginBottom: 16 }} onClick={() => showModal(null)}>
                    添加用户
                </Button>
                <Table columns={columns} dataSource={users} rowKey="id" />
                <Modal title="编辑用户" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <Form
                        layout="vertical"
                        initialValues={editingUser || { username: '', password: '' }}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </SidebarLayout>
    );
};

export default UserManagement;
