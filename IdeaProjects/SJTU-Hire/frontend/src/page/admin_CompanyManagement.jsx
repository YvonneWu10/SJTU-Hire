// CompanyManagement.js
import React, { useState, useEffect } from 'react';
import {Button, Table, Space, Select, Input} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {useSearchParams} from "react-router-dom";
import {AdminsearchCompanies} from "../service/company"; // 确保路径正确
const { Search } = Input;

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const companyName = searchParams.get("companyName") || "";
    const companyType = searchParams.get("companyType") || "";
    const companyScale = searchParams.get("companyScale") || "";

    const getCompanies = async () => {
        console.log("In search Companies");
        let resCompanies = await AdminsearchCompanies(pageIndex, pageSize, companyName, companyType, companyScale);
        let companies = resCompanies.items;
        let totalPage = resCompanies.total;
        setCompanies(companies);
        setTotalPage(totalPage);
        // console.log("API Response:", resCompanies);
    }

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getCompanies();
    }, [pageIndex, pageSize, companyName, companyType, companyScale]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const handleSearch = (companyName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("companyName", companyName);
        setSearchParams(currentParams);
    };

    const companyTypes = ["民营", "国企", "外企"];
    const companyTypeOptions: SelectProps["options"] = companyTypes.map(companyType => ({
        label: companyType,
        value: companyType
    }));

    const handleCompanyTypeOption = (companyType: string) => {
        if (companyType === undefined) {
            companyType = "";
        }
        // console.log(workType)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("companyType", companyType);
        setSearchParams(currentParams);
    };

    const companyScales = ["10-99人", "100-999人", "1000-5000人", "5000人以上"];
    const companyScaleOptions: SelectProps["options"] = companyScales.map(companyScale => ({
        label: companyScale,
        value: companyScale
    }));

    const handleCompanyScaleOption = (companyScale: string) => {
        if (companyScale === undefined) {
            companyScale = "";
        }
        // console.log(workType)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("companyScale", companyScale);
        setSearchParams(currentParams);
    };


    // Define the columns for the companies table
    const columns = [
        { title: '公司名称', dataIndex: 'companyName', key: 'companyId', width: '20%' },
        { title: '公司类型', dataIndex: 'companyType', key: 'companyId', width: '15%' },
        { title: '公司领域', dataIndex: 'companyField', key: 'companyId', width: '15%' },
        { title: '公司规模', dataIndex: 'companyScale', key: 'companyId', width: '15%' },
        { title: '融资阶段', dataIndex: 'financingStage', key: 'companyId', width: '10%' },

        // Add more columns as needed
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default">查看</Button>
                    <Button type="default">编辑</Button>
                    <Button danger>删除</Button>
                </Space>
            ),
        },
    ];

    // TODO: Implement CRUD functions for company operations

    return (
        <SidebarLayout>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <Select allowClear placeholder="请选择类型" onChange={handleCompanyTypeOption}
                                options={companyTypeOptions} style={{ height: '40px'}}/>
                        <Select allowClear placeholder="请选择规模" onChange={handleCompanyScaleOption}
                                options={companyScaleOptions} style={{ height: '40px'}}/>
                    </div>
                    <Search placeholder="输入公司名" onSearch={handleSearch} enterButton size="large" style={{ marginLeft: 'auto', maxWidth: '300px', width: '100%'}}/>
                    {/*<Button type="primary" style={{height: '40px'}}>添加公司</Button>*/}
                </div>
                <Table columns={columns} dataSource={companies} rowKey="companyId" pagination={{
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

export default CompanyManagement;
