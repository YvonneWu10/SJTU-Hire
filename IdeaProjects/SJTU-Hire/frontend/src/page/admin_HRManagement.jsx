// HRManagement.js
import React, {useState, useEffect, useCallback} from 'react';
import {Button, Table, Space, Modal, Form, Input, Select} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {useSearchParams} from "react-router-dom";
import type {SelectProps} from "antd";
import {adminDeleteHR, AdminsearchHRs} from "../service/HR";
import {getAllCompany} from "../service/company"; // 确保路径正确

const { Search } = Input;

const HRManagement = () => {
    const [HRs, setHRs] = useState([]);
    const [companies, setCompanies] = useState({});
    const [totalPage, setTotalPage] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 10;
    const HRName = searchParams.get("HRName") || "";

    const getHRs = async () => {
        console.log("In search HRs");
        let resHRs = await AdminsearchHRs(pageIndex, pageSize, HRName);
        let resCompany = await getAllCompany();

        // 构建以companyID为键的公司字典
        const companyDict = resCompany.reduce((acc, company) => {
            acc[company.companyId] = company.companyName;
            return acc;
        }, {});

        let HRs = resHRs.items.map(HR => ({
            ...HR,
            companyName: companyDict[HR.companyId], // 使用公司字典来获取公司名称
        }));

        let totalPage = resHRs.total;
        setHRs(HRs);
        setTotalPage(totalPage);
        setCompanies(resCompany.items);
        // console.log("HR Response:", resHRs);
    }


    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getHRs();
    }, [pageIndex, pageSize, HRName]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const handleSearch = (HRName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 10);
        currentParams.set("HRName", HRName);
        setSearchParams(currentParams);
    };

    // Delete Logic
    const handleDelete = (HRId) => {
        Modal.confirm({
            title: '确定要删除这个HR吗？',
            content: '删除后，您将无法恢复此HR。',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                console.log('删除HR', HRId);
                adminDeleteHR(HRId).then(() => {
                    // 刷新HR列表
                    getHRs();
                });
            }
        });
    };


    // Define the columns for the users table
    const columns = [
        { title: '用户名', dataIndex: 'hrname', key: 'hrname', width: '20%' },
        { title: '公司名', dataIndex: 'companyName', key: 'companyName', width: '25%' },
        { title: '部门名', dataIndex: 'departmentId', key: 'departmentId', width: '15%' },
        { title: '密码', dataIndex: 'hrpassword', key: 'hrpassword', render: text => '******', width: '15%' },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/*<Button onClick={() => showModal(record)}>编辑</Button>*/}
                    {/*<Button danger onClick={() => deleteUser(record.id)}>删除</Button>*/}
                    <Button type="default">查看</Button>
                    <Button type="default">编辑</Button>
                    <Button danger onClick={()=>handleDelete(record.hrid)}>删除</Button>
                </Space>
            ),
        },
    ];

    return (
        <SidebarLayout>
            <div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                    <div style={{display: 'flex', gap: '8px'}}>
                        <Search placeholder="输入用户名" onSearch={handleSearch} enterButton size="large"/>
                    </div>
                    {/*<Button type="primary" style={{height: '40px'}}>添加用户</Button>*/}
                </div>
                <Table columns={columns} dataSource={HRs} rowKey="hrid"/>
            </div>
        </SidebarLayout>
    );
};

export default HRManagement;
