// Statistics.js
import '../css/Statistics.css';  // 确保CSS文件路径正确
import React, {useEffect, useState} from 'react';
import SidebarLayout from './admin_SidebarLayout'; // 确保路径正确
import { Row, Col, Card, Statistic } from 'antd';
import {CaretUpOutlined, CaretDownOutlined, FrownTwoTone, EyeTwoTone, ContainerTwoTone, IdcardTwoTone } from '@ant-design/icons';
import {JobRankingList, AgeGraph, DegreeGraph, SalaryGraph, PostMap} from './statistics';
import {getCandidateNum, getCompanyNum, getHRNum, getpostInProgress, getPostNum} from "../service/admin";


const Statistics = () => {
    const [postNum, setPostNum] = useState(0);
    const [candidateNum, setCandidateNum] = useState(0);
    const [HRNum, setHRNum] = useState(0);
    const [companyNum, setCompanyNum] = useState(0);


    const renderChange = (value) => {
        const isPositive = parseFloat(value) > 0;   // 将字符串转换为数字并检查是否大于0
        const formattedValue = Math.abs(parseFloat(value)).toFixed(1);
        return (
            <span style={{ color: isPositive ? 'red' : 'green' }}>
                {isPositive ? "增长" : "下降"}
                {formattedValue}% {isPositive ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </span>
        );
    };

    // (已从后端获取)总岗位数、总应聘者数、总HR数
    // const postInProgressData = 0.72
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data1 = await getPostNum();
                setPostNum(data1);
                const data2 = await getCandidateNum();
                setCandidateNum(data2);
                const data3 = await getHRNum();
                setHRNum(data3);
                const data4 = await getCompanyNum();
                setCompanyNum(data4);
            } catch (e) {
                console.error('Error fetching PanelData:', e);
                setPostNum(0);
                setCandidateNum(0);
                setHRNum(0);
            }
        };
        fetchData();
    }, []);

    // 示例数据，您需要根据实际从后端获取
    const JobRankData = [
        { title: '运维Yuque', count: 830, percent: 83 },
        { title: '云原神', count: 600, percent: 60 },
        { title: 'Basement', count: 500, percent: 50 },
        { title: 'Kitchen - Sketch...', count: 400, percent: 40 },
        { title: 'Ant Design Pro', count: 350, percent: 35 },
        { title: 'Ant V', count: 120, percent: 12 }
    ];

    // 示例数据，您需要根据实际从后端获取
    const ageData = [
        { name: '<20岁', value: 40 },
        { name: '21-30岁', value: 60 },
        { name: '31-40岁', value: 30 },
        { name: '41-50岁', value: 50 },
        { name: '>51岁', value: 20 },
    ];

    // 示例数据，您需要根据实际从后端获取
    const degreeData = [
        { name: '本科', value: 150 },
        { name: '硕士', value: 80 },
        { name: '博士', value: 30 },
    ];

    // 示例数据，您需要根据实际从后端获取
    const salaryAndNumData = [
        { name: '<10', value: 150, type: 'given' },
        { name: '11-20', value: 145, type: 'given' },
        { name: '21-30', value: 230, type: 'given' },
        { name: '31-40', value: 124, type: 'given' },
        { name: '41-50', value: 46, type: 'given' },
        { name: '51-60', value: 50, type: 'given' },
        { name: '>61', value: 30, type: 'given' },
        { name: '<10', value: 72, type: 'required' },
        { name: '11-20', value: 162, type: 'required' },
        { name: '21-30', value: 189, type: 'required' },
        { name: '31-40', value: 153, type: 'required' },
        { name: '41-50', value: 40, type: 'required' },
        { name: '51-60', value: 60, type: 'required' },
        { name: '>61', value: 54, type: 'required' },
    ];

    // 示例数据，您需要根据实际从后端获取
    const salaryAndDegreeNumData = [
        { name: '<10', value: 100, type: '本科' },
        { name: '11-20', value: 90, type: '本科' },
        { name: '21-30', value: 100, type: '本科' },
        { name: '31-40', value: 60, type: '本科' },
        { name: '41-50', value: 10, type: '本科' },
        { name: '51-60', value: 10, type: '本科' },
        { name: '>61', value: 5, type: '本科' },
        { name: '<10', value: 40, type: '硕士' },
        { name: '11-20', value: 40, type: '硕士' },
        { name: '21-30', value: 80, type: '硕士' },
        { name: '31-40', value: 40, type: '硕士' },
        { name: '41-50', value: 26, type: '硕士' },
        { name: '51-60', value: 20, type: '硕士' },
        { name: '>61', value: 10, type: '硕士' },
        { name: '<10', value: 10, type: '博士' },
        { name: '11-20', value: 15, type: '博士' },
        { name: '21-30', value: 50, type: '博士' },
        { name: '31-40', value: 24, type: '博士' },
        { name: '41-50', value: 10, type: '博士' },
        { name: '51-60', value: 20, type: '博士' },
        { name: '>61', value: 15, type: '博士' },
    ];

    // 示例数据，您需要根据实际从后端获取
    const PostCityData = [
        { province: '广东', value: 130, lng: 113.763433, lat: 23.379033 },
        { province: '北京', value: 230, lng: 116.407526, lat: 39.904030 },
        { province: '上海', value: 210, lng: 121.473701, lat: 31.230416 },
        { province: '江苏', value: 220, lng: 118.763232, lat: 32.061707 },
        { province: '浙江', value: 210, lng: 120.152792, lat: 29.267544 },
        { province: '哈尔滨', value: 70, lng: 126.642464, lat: 45.756967 },
    ];

    // 示例数据，您需要根据实际从后端获取
    const GDPSpeed = {
        '520000': { value: 10, name: '贵州', center: [106.713478, 26.578343] },
        '540000': { value: 10, name: '西藏', center: [90.117212, 30.646923] },
        '530000': { value: 8.5, name: '云南', center: [101.712251, 24.540609] },
        '500000': { value: 8.5, name: '重庆', center: [107.504962, 29.833155] },
        '360000': { value: 8.5, name: '江西', center: [115.892151, 28.676493] },
        '340000': { value: 8.0, name: '安徽', center: [117.283042, 31.86119] },
        '510000': { value: 7.5, name: '四川', center: [103.265735, 30.659462] },
        '350000': { value: 8.5, name: '福建', center: [118.306239, 26.075302] },
        '430000': { value: 8.0, name: '湖南', center: [111.582279, 27.99409] },
        '420000': { value: 7.5, name: '湖北', center: [112.298572, 30.784355] },
        '410000': { value: 7.5, name: '河南', center: [113.665412, 33.757975] },
        '330000': { value: 7.0, name: '浙江', center: [120.153576, 29.087459] },
        '640000': { value: 7.5, name: '宁夏', center: [105.878179, 37.16637] },
        '650000': { value: 7.0, name: '新疆', center: [85.617733, 41.792818] },
        '440000': { value: 7.0, name: '广东', center: [113.280637, 23.125178] },
        '370000': { value: 7.0, name: '山东', center: [118.500923, 36.275807] },
        '450000': { value: 7.3, name: '广西', center: [108.620004, 23.62402] },
        '630000': { value: 7.0, name: '青海', center: [95.678916, 36.223178] },
        '320000': { value: 7.0, name: '江苏', center: [119.967413, 33.041544] },
        '140000': { value: 6.5, name: '山西', center: [112.349248, 37.557014] },
        '460000': { value: 7, name: '海南', center: [110.03119, 18.931971] },
        '310000': { value: 6.5, name: '上海', center: [121.472644, 31.231706] },
        '110000': { value: 6.5, name: '北京', center: [116.405285, 39.904989] },
        '130000': { value: 6.5, name: '河北', center: [115.502461, 38.045474] },
        '230000': { value: 6, name: '黑龙江', center: [128.642464, 47.056967] },
        '220000': { value: 6, name: '吉林', center: [125.3245, 43.886841] },
        '210000': { value: 6.5, name: '辽宁', center: [123.029096, 41.496767] },
        '150000': { value: 6.5, name: '内蒙古', center: [112.670801, 42.418311] },
        '120000': { value: 5, name: '天津', center: [117.390182, 39.125596] },
        '620000': { value: 6, name: '甘肃', center: [103.823557, 36.058039] },
        '610000': { value: 8.5, name: '陕西', center: [108.948024, 34.263161] },
        '710000': { value: 6.64, name: '台湾', center: [120.509062, 23.244332] },
        '810000': { value: 6.0, name: '香港', center: [114.173355, 22.320048] },
        '820000': { value: 6.7, name: '澳门', center: [113.54909, 22.198951] },
    };




    return (
        <SidebarLayout>
            <Card  bordered={false} style={{border: 'none', marginBottom: '10px'}}>
                <div style={{fontWeight: 'bold', fontSize: '17px'}}>核心指标</div>
                <Row gutter={6}>
                    <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
                        <Card bordered={false} style={{ border: 'none', boxShadow: "none"}}>
                            <EyeTwoTone /> 总岗位数
                            <Statistic value={postNum} valueStyle={{ fontSize: '30px', fontWeight: 'bold' }} />
                            <div className="small-text">同比昨日 {renderChange('12.2')}</div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
                        <Card bordered={false} style={{ border: 'none', boxShadow: "none"}}>
                            <ContainerTwoTone /> 总应聘者数
                            <Statistic value={candidateNum} valueStyle={{ fontSize: '30px', fontWeight: 'bold' }} />
                            <div className="small-text">同比昨日{renderChange('-13.4')}</div>
                        </Card>
                    </Col>
                    <Col span={6} style={{ borderRight: '1px solid #ccc' }}>
                        <Card bordered={false} style={{ border: 'none', boxShadow: "none"}}>
                            <IdcardTwoTone /> 总HR数
                            <Statistic value={HRNum} valueStyle={{ fontSize: '30px', fontWeight: 'bold' }} />
                            <div className="small-text">同比昨日{renderChange('10.0')}</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false} style={{border: 'none', boxShadow: "none"}}>
                            <FrownTwoTone/> 总公司数
                            <Statistic value={companyNum} valueStyle={{fontSize: '30px', fontWeight: 'bold'}}/>
                            <div className="small-text">同比昨日{renderChange('0.0')}</div>
                        </Card>
                    </Col>
                </Row>
            </Card>
            <Row gutter={6} style={{ marginBottom: '10px' }}>
                <Col span={16}>
                    <Card>
                        <PostMap data={GDPSpeed} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <JobRankingList data={JobRankData}/>
                    </Card>
                </Col>
            </Row>
            <Row gutter={6} style={{ marginBottom: '10px' }}>
                <Col span={12}>
                    <Card>
                        <SalaryGraph data1={salaryAndNumData} data2={salaryAndDegreeNumData} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <AgeGraph data={ageData} />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <DegreeGraph data={degreeData} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={6} style={{ marginBottom: '10px' }}>
                <Col span={6}>

                </Col>
                <Col span={18}>

                </Col>
            </Row>
        </SidebarLayout>
    );
};

export default Statistics;
