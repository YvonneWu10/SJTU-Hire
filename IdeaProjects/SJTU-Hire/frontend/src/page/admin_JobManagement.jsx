// JobManagement.js
import React, { useState, useEffect } from 'react';
import {Button, Table, Space, Input, Select} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {AdminsearchPosts, retAdminPostCities} from "../service/post"; // 确保路径正确
import { useSearchParams } from 'react-router-dom';
import {getAllCompany} from "../service/company";

const { Search } = Input;

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
        console.log("API Response:", resPosts);
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


    const columns = [
        // Define table columns for job data
        { title: '岗位名称', dataIndex: 'postName', key: 'postId', width: '20%'},
        { title: '公司名称', dataIndex: 'companyName', key: 'postId', width: '25%' },
        { title: '地点', dataIndex: 'city', key: 'postId', width: '10%' },
        { title: '类型', dataIndex: 'workType', key: 'postId', width: '10%' },
        { title: '方式', dataIndex: 'workStyle', key: 'postId', width: '10%' },
        // Add more columns as needed
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default" onClick={() => window.location.href = `/candidate_view/Post/${record.postId}`}>查看</Button>
                    <Button type="default">编辑</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];



    return (
        <SidebarLayout>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <Search placeholder="输入岗位名" onSearch={handleSearch} enterButton size="large" />
                        <Select allowClear placeholder="请选择城市" onChange={handleCityOption} options={cityOptions} style={{ height: '40px' }} />
                        <Select allowClear placeholder="请选择实习/正式" onChange={handleWorkTypeOption}
                                options={workTypeOptions} style={{ height: '40px' }}/>
                        <Select allowClear placeholder="请选择线下/远程" onChange={handleWorkStyleOption}
                                options={workStyleOptions} style={{ height: '40px' }}/>
                    </div>
                    <Button type="primary" style={{ height: '40px' }}>添加岗位</Button>
                </div>
                <Table columns={columns} dataSource={posts} rowKey="postId" pagination={{
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
