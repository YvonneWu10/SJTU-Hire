// JobManagement.js
import React, { useState, useEffect } from 'react';
import {Button, Table, Space, Input, Select, Modal} from 'antd';
import SidebarLayout from './admin_SidebarLayout';
import {AdminsearchPosts, retAdminPostCities, AdmindeletePost} from "../service/post"; // 确保路径正确, createPost
import { useSearchParams } from 'react-router-dom';
import { getAllCompany} from "../service/company";

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
        // console.log("API Response:", resPosts);
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
        { title: '岗位名称', dataIndex: 'postName', key: 'postName', width: '20%'},
        { title: '公司名称', dataIndex: 'companyName', key: 'companyName', width: '25%' },
        { title: '地点', dataIndex: 'city', key: 'city', width: '10%' },
        { title: '类型', dataIndex: 'workType', key: 'workType', width: '10%' },
        { title: '方式', dataIndex: 'workStyle', key: 'workStyle', width: '10%' },
        // Add more columns as needed
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default" onClick={() => window.location.href = `/candidate_view/Post/${record.postId}`}>查看</Button>
                    <Button type="default">编辑</Button>
                    <Button danger onClick={() => handleDelete(record.postId)}>删除</Button>
                </Space>
            ),
        },
    ];


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
                <Table columns={columns} dataSource={posts} rowKey="postId" pagination={{
                    current: pageIndex,
                    pageSize,
                    total: totalPage * pageSize,
                    onChange: handlePageChange,
                    hideOnSinglePage: true
                }}/>
                {/*<Drawer*/}
                {/*    title="添加新岗位"*/}
                {/*    width={720}*/}
                {/*    onClose={closeDrawer}*/}
                {/*    visible={drawerVisible}*/}
                {/*    bodyStyle={{ paddingBottom: 80 }}*/}
                {/*    footer={*/}
                {/*        <div style={{ textAlign: 'right' }}>*/}
                {/*            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>取消</Button>*/}
                {/*            <Button onClick={handleFormSubmit} type="primary">提交</Button>*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*>*/}
                {/*    <Form form={form} layout="vertical" hideRequiredMark>*/}
                {/*        <Form.Item name="postName" label="岗位名称" rules={[{ required: true, message: '请输入岗位名称' }]}>*/}
                {/*            <Input placeholder="请输入岗位名称" />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="companyName" label="公司名称" rules={[{ required: true, message: '请输入公司名称' }]}>*/}
                {/*            <Input placeholder="请输入公司名称" />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="city" label="城市" rules={[{ required: true, message: '请选择城市' }]}>*/}
                {/*            <Select placeholder="请选择城市" options={cityOptions}></Select>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="workType" label="工作类型" rules={[{ required: true, message: '请选择工作类型' }]}>*/}
                {/*            <Select placeholder="请选择工作类型" options={workTypeOptions}></Select>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="workStyle" label="工作方式" rules={[{ required: true, message: '请选择工作方式' }]}>*/}
                {/*            <Select placeholder="请选择工作方式" options={workStyleOptions}></Select>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="degreeReq" label="学历要求" rules={[{ required: true, message: '请选择学历要求' }]}>*/}
                {/*            <Select placeholder="请选择学历要求">*/}
                {/*                {degreeOptions.map(degree => (*/}
                {/*                    <Option key={degree} value={degree}>{degree}</Option>*/}
                {/*                ))}*/}
                {/*            </Select>*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="workYearReq" label="工作经验年数要求" rules={[{required: true, message: '请输入工作经验年数要求'}, {type: 'number', min: 0, message: '格式不符合要求（请输入非负整数）'}]}>*/}
                {/*            <InputNumber placeholder="请输入工作经验年数要求" style={{ width: '100%' }} />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="onSiteDayReq" label="一周到岗天数要求" rules={[{ required: true, message: '请输入一周到岗天数要求' }, {type: 'number', min: 0, max:7, message: '格式不符合要求（请输入1-7的整数）'}]}>*/}
                {/*            <InputNumber placeholder="请输入一周到岗天数要求" style={{ width: '100%' }} />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="openDate" label="开放日期" rules={[{ required: true, message: '请选择开放日期' }]}>*/}
                {/*            <DatePicker placeholder="请选择开放日期" style={{ width: '100%' }} />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="endDate" label="关闭日期" rules={[{ required: true, message: '请选择关闭日期' }]}>*/}
                {/*            <DatePicker placeholder="请选择关闭日期" style={{ width: '100%' }} />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="recruitNum" label="招募人数" rules={[{ required: true, message: '请输入招募人数' }, {type: 'number', min: 0, message: '格式不符合要求（请输入非负整数）'}]}>*/}
                {/*            <InputNumber placeholder="请输入招募人数" style={{ width: '100%' }} />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="salary" label="年薪" rules={[{ required: true, message: '请输入年薪(k)' }, {type: 'number', min: 0, message: '格式不符合要求（请输入非负整数）'}]}>*/}
                {/*            <InputNumber placeholder="请输入年薪(k)" style={{ width: '100%' }} />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="departmentId" label="部门名" rules={[{ required: true, message: '请输入负责部门' }]}>*/}
                {/*            <Input placeholder="请输入负责部门" />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="HRId" label="对应HR名" rules={[{ required: true, message: '请输入对应HR名' }]}>*/}
                {/*            <Input placeholder="请输入对应HR名" />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="description" label="岗位描述" rules={[{ required: true, message: '请输入岗位描述' }]}>*/}
                {/*            <Input placeholder="请输入岗位描述" />*/}
                {/*        </Form.Item>*/}
                {/*        <Form.Item name="responsibility" label="岗位需求" rules={[{ required: true, message: '请输入岗位需求' }]}>*/}
                {/*            <Input placeholder="请输入岗位需求" />*/}
                {/*        </Form.Item>*/}
                {/*    </Form>*/}
                {/*</Drawer>*/}
            </div>
        </SidebarLayout>
    );
};

export default JobManagement;
