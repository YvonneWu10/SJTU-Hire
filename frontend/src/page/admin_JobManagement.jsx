// JobManagement.js
import React, { useState, useEffect } from 'react';
import {Button, Table, Space, Input, Select, Modal, Row, Col} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {AdminsearchPosts, retAdminPostCities, AdmindeletePost} from "../service/post"; // 确保路径正确, createPost
import { useSearchParams } from 'react-router-dom';
import { getAllCompany} from "../service/company";
import {
    AuditOutlined, CommentOutlined, DesktopOutlined,
    EnvironmentOutlined, EuroOutlined,
    ExceptionOutlined, FieldNumberOutlined,
    FieldTimeOutlined,
    HomeOutlined, InsertRowAboveOutlined, NotificationOutlined, ProfileOutlined, TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const JobManagement = () => {
    const [posts, setPosts] = useState([]);
    const [companies, setCompanies] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [cities, setCities] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 25;
    const postName = searchParams.get("postName") || "";
    const city = searchParams.get("city") || "";
    const workType = searchParams.get("workType") || "";
    const workStyle = searchParams.get("workStyle") || "";
    // const [drawerVisible, setDrawerVisible] = useState(false);
    // const [form] = Form.useForm();
    const degreeOptions = ['大专', '本科', '硕士', '博士'];

    const getPosts = async () => {
        console.log("In search Posts");
        let resPosts = await AdminsearchPosts(pageIndex, pageSize, postName, city, workType, workStyle);
        let resCompany = await getAllCompany();


        // 构建以companyID为键的公司字典
        const companyDict = resCompany.reduce((acc, company) => {
            acc[company.companyId] = company.companyName;
            return acc;
        }, {});

        // console.log("companyDict:", companyDict); // 调试

        // 将公司名称添加到岗位数据中
        let posts = resPosts.items.map(post => ({
            ...post,
            companyName: companyDict[post.companyId], // 使用公司字典来获取公司名称
        }));

        // console.log("Posts:", posts); // 调试

        // let posts = resPosts.items;
        let totalPage = resPosts.total;
        setPosts(posts);
        setTotalPage(totalPage);
        // console.log("API Response:", posts);
    };

    const getPostCities = async () => {
        let resCities = await retAdminPostCities();
        setCities(resCities);
    };

    useEffect(() => {
        getPostCities();
    }, []);

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

    // const cities = ["北京", "成都", "重庆", "大连", "福州", "广州", "哈尔滨", "海口", "杭州", "齐齐哈尔", "上海", "深圳", "台北", "武汉"];
    const cityOptions: SelectProps['options'] = cities.map(city => ({
        label: city,
        value: city
    }));
    const workTypes = ["实习", "正式"];
    const workTypeOptions: SelectProps["options"] = workTypes.map(workType => ({
        label: workType,
        value: workType
    }));
    const workStyles = ["线下", "远程"];
    const workStyleOptions: SelectProps["options"] = workStyles.map(workStyle => ({
        label: workStyle,
        value: workStyle
    }));

    const handleCityOption = (city: string) => {
        if (city === undefined) {
            city = "";
        }
        // console.log(city)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("city", city);
        setSearchParams(currentParams);
    };

    const handleWorkTypeOption = (workType: string) => {
        if (workType === undefined) {
            workType = "";
        }
        // console.log(workType)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("workType", workType);
        setSearchParams(currentParams);
    };

    const handleWorkStyleOption = (workStyle: string) => {
        if (workStyle === undefined) {
            workStyle = "";
        }
        // console.log(workStyle)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("workStyle", workStyle);
        setSearchParams(currentParams);
    };

    const handleDelete =  (postId) => {
        Modal.confirm({
            title: '确定要删除这个岗位吗？',
            content: '删除后，您将无法恢复此岗位。',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                // console.log('删除岗位', postId);
                AdmindeletePost(postId).then(() => {
                    // 刷新岗位列表
                    getPosts();
                });
            }
        });
    };


    const columns = [
        // Define table columns for job data
        { title: '岗位名称', dataIndex: 'postName', key: 'postName', width: '25%'},
        { title: '公司名称', dataIndex: 'companyName', key: 'companyName', width: '30%' },
        { title: '地点', dataIndex: 'city', key: 'city', width: '10%' },
        { title: '类型', dataIndex: 'workType', key: 'workType', width: '10%' },
        { title: '方式', dataIndex: 'workStyle', key: 'workStyle', width: '10%' },
        // Add more columns as needed
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => handleDelete(record.postId)}>删除</Button>
                </Space>
            ),
        },
    ];

    // 定义展开行内容的渲染函数
    const expandedRowRender = (record) => {
        return (
            <div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848'}}>
                    <Row>
                        <Col span={3} style={{fontSize: 13}}>
                            <FieldNumberOutlined/> 岗位号：{record.postId}
                        </Col>
                        <Col span={4} style={{fontSize: 13}}>
                            <UserOutlined/> 岗位名：{record.postName}
                        </Col>
                        <Col span={5} style={{fontSize: 13}}>
                            <HomeOutlined/> 公司名：{record.companyName}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <EnvironmentOutlined/> 城市：{record.city}
                        </Col>
                        <Col span={4} style={{fontSize: 13}}>
                            <AuditOutlined/> 工作类型：{record.workStyle}{record.workType}
                        </Col>
                        <Col span={4} style={{fontSize: 13}}>
                            <EuroOutlined/> 年薪：{record.salary} k&nbsp;&nbsp;&nbsp;&nbsp;
                        </Col>
                    </Row>
                </div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848'}}>
                    <Row>
                        <Col span={7} style={{fontSize: 13}}>
                            <FieldTimeOutlined/> 开放时间：{record.openDate} - {record.endDate}
                        </Col>
                        <Col span={5} style={{fontSize: 13}}>
                            <ExceptionOutlined/> 学历要求：{record.degreeReq}
                        </Col>
                        <Col span={3} style={{fontSize: 13}}>
                            <TeamOutlined/> 招聘人数：{record.recruitNum}
                        </Col>
                        <Col span={4} style={{fontSize: 13}}>
                            <DesktopOutlined/> 工作经验：{record.workYearReq} 年
                        </Col>
                        <Col span={4} style={{fontSize: 13}}>
                            <InsertRowAboveOutlined/> 一周到岗：{record.onSiteDayReq} 天
                        </Col>
                    </Row>
                </div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848', fontSize: 13}}>
                    <CommentOutlined/> 负责HR：{record.hrid}
                </div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848', fontSize: 13}}>
                    <ProfileOutlined /> 岗位职责：{record.responsibility}
                </div>
                <div style={{marginLeft: 20, marginBottom: 5, color: '#005848', fontSize: 13}}>
                    <NotificationOutlined/> 岗位描述：{record.description}
                </div>
            </div>
        );
    };


    return (
        <SidebarLayout>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                <div style={{display: 'flex', gap: '8px'}}>
                        <Select allowClear placeholder="请选择城市" onChange={handleCityOption} options={cityOptions} style={{ height: '40px' }} />
                        <Select allowClear placeholder="请选择实习/正式" onChange={handleWorkTypeOption}
                                options={workTypeOptions} style={{ height: '40px' }}/>
                        <Select allowClear placeholder="请选择线下/远程" onChange={handleWorkStyleOption}
                                options={workStyleOptions} style={{ height: '40px' }}/>

                    </div>
                    <Search placeholder="输入岗位名" onSearch={handleSearch} enterButton size="large" style={{ marginLeft: 'auto', maxWidth: '300px', width: '100%'}} />
                    {/*<Button type="primary" onClick={showDrawer} style={{ height: '40px' }}>添加岗位</Button>*/}
                </div>
                <Table columns={columns} dataSource={posts} rowKey="postId" expandable={{ expandedRowRender }} pagination={{
                    current: pageIndex,
                    pageSize,
                    total: totalPage * pageSize,
                    onChange: handlePageChange,
                    hideOnSinglePage: true
                }}/>
            </div>
        </SidebarLayout>
    );
};

export default JobManagement;
