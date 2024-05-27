// CandidateManagement.js
import React, {useState, useEffect, useCallback} from 'react';
import {Button, Table, Space, Modal, Form, Input, Select, Tooltip, Row, Col} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {useSearchParams} from "react-router-dom";
import {adminDeleteCandidate, AdminsearchCandidates, retCandMajors, retCandUniversities} from "../service/candidate";
import type {SelectProps} from "antd";
import {
    AuditOutlined, BankOutlined, BookOutlined, ContainerOutlined,
    EnvironmentOutlined,
    EuroOutlined,
    EyeInvisibleOutlined,
    EyeOutlined,
    FieldNumberOutlined, ForkOutlined,
    FormatPainterOutlined,
    HomeOutlined,
    HourglassOutlined,
    MailOutlined,
    NotificationOutlined,
    PayCircleOutlined,
    PhoneOutlined,
    SafetyCertificateOutlined,
    TeamOutlined,
    UserOutlined,
    WomanOutlined
} from "@ant-design/icons"; // 确保路径正确

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
    // 创建一个状态来存储哪些密码是可见的
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const togglePasswordVisibility = key => {
        setVisiblePasswords(prev => ({ ...prev, [key]: !prev[key] }));
    };


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
        { title: '性别', dataIndex: 'candGender', key: 'candGender', width: '10%' },
        { title: '年龄', dataIndex: 'candAge', key: 'candAge', width: '10%' },
        { title: '学校', dataIndex: 'candUniversity', key: 'candUniversity', width: '13%' },
        { title: '专业', dataIndex: 'candMajor', key: 'candMajor', width: '15%' },
        { title: '学历', dataIndex: 'candDegree', key: 'candDegree', width: '10%' },
        {
            title: '密码',
            dataIndex: 'candPassword',
            key: 'candPassword',
            width: '16%',
            render: (text, record) => (
                <Input
                    type={visiblePasswords[record.key] ? 'text' : 'password'}
                    value={text}
                    suffix={
                        <Tooltip title={visiblePasswords[record.key] ? "隐藏密码" : "显示密码"}>
                            <Button
                                icon={visiblePasswords[record.key] ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                onClick={() => togglePasswordVisibility(record.key)}
                                type="text"
                            />
                        </Tooltip>
                    }
                    disabled
                />
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => handleDelete(record.candId)}>删除</Button>
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        return(
            <div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848'}}>
                    <Row>
                        <Col span={5} style={{fontSize: 13}}>
                            <FieldNumberOutlined/> 账号：{record.candId}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <UserOutlined /> 姓名：{record.candName}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <HomeOutlined/> 省份：{record.candProvince}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <WomanOutlined /> 性别：{record.candGender}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <HourglassOutlined /> 年龄：{record.candAge}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <FormatPainterOutlined /> 工作经验：{record.candWorkYear} 年
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <PayCircleOutlined /> 期望年薪：{record.candExpectedSalary} k
                        </Col>
                    </Row>
                </div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848', fontSize: 13}}>
                    <Row>
                        <Col span={5} style={{fontSize: 13}}>
                            <MailOutlined /> 邮箱：{record.candMail}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <PhoneOutlined /> 电话：{record.candPhone}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <BankOutlined /> 大学：{record.candUniversity}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <ContainerOutlined /> 学历：{record.candDegree}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <ForkOutlined /> 专业：{record.candMajor}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <AuditOutlined /> 导师：{record.candMentor}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <BookOutlined /> 论文数：{record.candPaperNum}
                        </Col>
                    </Row>
                </div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848', fontSize: 13}}>
                    <Row>
                        <Col span={5} style={{fontSize: 13}}>
                            <SafetyCertificateOutlined /> 密码：{record.candPassword}
                        </Col>
                        <Col span={5} style={{fontSize: 13}}>
                            <SafetyCertificateOutlined /> Token：{record.candToken}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    };


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
                </div>
                <Table columns={columns} dataSource={candidates} expandable={{ expandedRowRender }} rowKey="candId"/>
            </div>
        </SidebarLayout>
    );
};

export default CandidateManagement;
