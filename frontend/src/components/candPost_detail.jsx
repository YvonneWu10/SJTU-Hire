import {Button, Col, Descriptions, Row, Space, Steps} from "antd";

import { Divider, Typography } from 'antd';
import React from "react";

const { Title, Text } = Typography;

// 具体的投递信息展示，主要是流程状态和招聘者简历
export default function CandPostDetails({ candidate, post, candPost, projectList }) {
    const basicItems = [
        {
            key: '1',
            label: '姓名',
            children: candidate.candName,
        },
        {
            key: '2',
            label: '身份证号',
            children: candidate.candId,
        },
        {
            key: '3',
            label: '性别',
            children: candidate.candGender,
        },
        {
            key: '4',
            label: '年龄',
            children: candidate.candAge,
        },
        {
            key: '5',
            label: '电话',
            children: candidate.candPhone,
        },
        {
            key: '6',
            label: '邮箱',
            children: candidate.candMail,
        },
        {
            key: '7',
            label: '户籍省份',
            children: candidate.candProvince,
        },
        {
            key: '8',
            label: '学历',
            children: candidate.candDegree,
        },
        {
            key: '9',
            label: '毕业院校',
            children: candidate.candUniversity,
        },
        {
            key: '10',
            label: '专业',
            children: candidate.candMajor,
        },
        {
            key: '11',
            label: 'GPA',
            children: candidate.candGPA,
        },
        {
            key: '12',
            label: '导师',
            children: candidate.candMentor,
        },
        {
            key: '13',
            label: '论文数量',
            children: candidate.candPaperNum,
        },
        {
            key: '14',
            label: '工作经验',
            children: `${candidate.candWorkYear}年`,
        },
        {
            key: '15',
            label: '期望工资',
            children: `${candidate.candExpectedSalary}k`,
        },
    ];

    const projectDescriptions = projectList.map((project) => ({
        key: project.id,
        label: <span style={{fontSize: '16px'}}>项目 - {project.projectName}</span>,
        span: 3,
        children: (
            <Descriptions layout="vertical" column={3}>
                <Descriptions.Item label="开始时间">{project.startDate}</Descriptions.Item>
                <Descriptions.Item label="结束时间">{project.endDate}</Descriptions.Item>
                <Descriptions.Item label="项目业绩">{project.projectAchievement}k</Descriptions.Item>
                <Descriptions.Item label="描述" >
                    <span style={{textIndent: '2em', textAlign: 'left'}}>{project.description}</span>
                </Descriptions.Item>
            </Descriptions>
        ),
    }));

    const allItems = [...basicItems, ...projectDescriptions];

    const getStage = (stage) => {
        // Map the path to the corresponding key
        const keyMap = {
            "简历": 0,  // Home page key
            "笔试": 1,
            "一面": 2,
            "二面": 3,
            "hr面" : 4,
            "offer评估" :5,
            "录取": 6,
            "流程终止": -1,
        };
        return keyMap[stage];
    };

    const isErrors = (stage) => {
        // Map the path to the corresponding key
        const keyMap = {
            "简历": "wait",  // Home page key
            "笔试": "wait",
            "一面": "wait",
            "二面": "wait",
            "hr面" : "wait",
            "offer评估" :"wait",
            "录取": "wait",
            "流程终止": "error",
        };
        return keyMap[stage];
    };



    return (
        <div>
            <p style={{display: "flex", fontSize: '22px', align: 'center', justifyContent: 'center'}}> 面试岗位: {post.postName} </p>
        <div style={{ display: 'flex', alignItems: 'center', marginLeft:'50px', marginRight:'50px'}}>
            <Steps
                current={getStage(candPost.submissionStage)}
                items={[
                    {
                        title: '简历',
                    },
                    {
                        title: '笔试',
                    },
                    {
                        title: '一面',
                    },
                    {
                        title: '二面',
                    },
                    {
                        title: 'hr面',
                    },
                    {
                        title: 'offer评估',
                    },
                    {
                        title: "录取",
                    },
                    {
                        title: "淘汰",
                        status:isErrors(candPost.submissionStage)
                    }
                ]}
            />
        </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop:'30px' }}>
                <Col span={15}>
                    <Descriptions layout="vertical" column={3} items={allItems}/>
                </Col>
            </div>
        </div>
    );
}