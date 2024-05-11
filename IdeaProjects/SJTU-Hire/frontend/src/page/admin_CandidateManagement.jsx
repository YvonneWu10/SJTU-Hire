// CandidateManagement.js
import React, {useState, useEffect, useCallback} from 'react';
import {Button, Table, Space, Modal, Form, Input, Select} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {useSearchParams} from "react-router-dom";
import {adminDeleteCandidate, AdminsearchCandidates, retCandMajors, retCandUniversities} from "../service/candidate";
import type {SelectProps} from "antd"; // 确保路径正确

const { Search } = Input;

const CandidateManagement = () => {
    const [candidates, setCandidates] = useState([]);
    const [majors, setMajors] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const candName = searchParams.get("candName") || "";
    const candUniversity = searchParams.get("candUniversity") || "";
    const candGender = searchParams.get("candGender") || "";
    const candMajor = searchParams.get("candMajor") || "";

    const getCandidates = async () => {
        console.log("In search Candidates");
        let resCandidates = await AdminsearchCandidates(pageIndex, pageSize, candName, candGender, candUniversity, candMajor);
        let candidates = resCandidates.items;
        let totalPage = resCandidates.total;
        setCandidates(candidates);
        setTotalPage(totalPage);
        // console.log("API Response:", resCandidates);
    }

    const getMajors = async () => {
        console.log("In getMajors");
        let resMajors = await retCandMajors();
        setMajors(resMajors);
        // console.log("Majors Response:", resMajors);
    }

    const getUniversities = async () => {
        console.log("In getUniversities");
        let resUniversities = await retCandUniversities();
        setUniversities(resUniversities);
        // console.log("University Response:", resUniversities);
    }

    useEffect(() => {
        getMajors();
        getUniversities();
    }, []);

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getCandidates();
    }, [pageIndex, pageSize, candName, candUniversity, candGender, candMajor]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const handleSearch = (candName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("candName", candName);
        setSearchParams(currentParams);
    };

    const candGenders = ["男", "女"];
    const candGenderOptions: SelectProps["options"] = candGenders.map(candGender => ({
        label: candGender,
        value: candGender
    }));

    const handleCandGenderOption = (candGender: string) => {
        if (candGender === undefined) {
            candGender = "";
        }
        // console.log(workType)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("candGender", candGender);
        setSearchParams(currentParams);
    };

    const majorOptions: SelectProps['options'] = majors.map(major => ({
        label: major,
        value: major
    }));

    const handleMajorOption = (major: string) => {
        if (major === undefined) {
            major = "";
        }
        // console.log(city)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("candMajor", major);
        setSearchParams(currentParams);
    };

    const universityOptions: SelectProps['options'] = universities.map(university => ({
        label: university,
        value: university
    }));

    const handleUniversityOption = (university: string) => {
        if (university === undefined) {
            university = "";
        }
        // console.log(city)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("candUniversity", university);
        setSearchParams(currentParams);
    };

    const handleDelete = (candId) => {
        Modal.confirm({
            title: '确定要删除这个招聘者吗？',
            content: '删除后，您将无法恢复此招聘者。',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('删除招聘者', candId);
                adminDeleteCandidate(candId).then(() => {
                    // 刷新招聘者列表
                    getCandidates();
                });
            }
        });
    };

    // Define the columns for the users table
    const columns = [
        { title: '用户名', dataIndex: 'candName', key: 'candName', width: '10%' },
        { title: '性别', dataIndex: 'candGender', key: 'candGender', width: '6%' },
        { title: '年龄', dataIndex: 'candAge', key: 'candAge', width: '6%' },
        { title: '学校', dataIndex: 'candUniversity', key: 'candUniversity', width: '18%' },
        { title: '专业', dataIndex: 'candMajor', key: 'candMajor', width: '15%' },
        { title: '学历', dataIndex: 'candDegree', key: 'candDegree', width: '10%' },
        { title: '密码', dataIndex: 'candPassword', key: 'candPassword', width: '10%', render: text => '******' }, //
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/*<Button onClick={() => showModal(record)}>编辑</Button>*/}
                    {/*<Button danger onClick={() => deleteUser(record.id)}>删除</Button>*/}
                    <Button type="default">查看</Button>
                    <Button type="default">编辑</Button>
                    <Button danger onClick={() => handleDelete(record.candId)}>删除</Button>
                </Space>
            ),
        },
    ];


    return (
        <SidebarLayout>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <Select allowClear placeholder="请选择性别" onChange={handleCandGenderOption}
                                options={candGenderOptions} style={{height: '40px'}}/>
                        <Select allowClear placeholder="请选择学校" onChange={handleUniversityOption}
                                options={universityOptions} style={{height: '40px'}}/>
                        <Select allowClear placeholder="请选择专业" onChange={handleMajorOption}
                                options={majorOptions} style={{height: '40px'}}/>
                    </div>
                    <Search placeholder="输入用户名" onSearch={handleSearch} enterButton size="large" style={{ marginLeft: 'auto', maxWidth: '300px', width: '100%'}}/>
                    {/*<Button type="primary" style={{height: '40px'}}>添加用户</Button>*/}
                </div>
                <Table columns={columns} dataSource={candidates} rowKey="candId"/>
                {/*<Modal title="编辑用户" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>*/}
                {/*    <Form*/}
                {/*        layout="vertical"*/}
                {/*        initialValues={editingUser || { username: '', password: '' }}*/}
                {/*    >*/}
                {/*        <Form.Item*/}
                {/*            label="用户名"*/}
                {/*            name="username"*/}
                {/*            rules={[{ required: true, message: '请输入用户名!' }]}*/}
                {/*        >*/}
                {/*            <Input />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item*/}
                {/*            label="密码"*/}
                {/*            name="password"*/}
                {/*            rules={[{ required: true, message: '请输入密码!' }]}*/}
                {/*        >*/}
                {/*            <Input.Password />*/}
                {/*        </Form.Item>*/}
                {/*    </Form>*/}
                {/*</Modal>*/}
            </div>
        </SidebarLayout>
    );
};

export default CandidateManagement;
