import {Col, Descriptions, Row, Space} from "antd";
import { Divider, Typography } from 'antd';
import React from "react";
import { EnvironmentOutlined, TagOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function PostDetails({ post, department }) {
    const basicItems = [
        {
            key: '1',
            label: '投递时间',
            children: `${post.openDate} - ${post.endDate}`,
        },
        {
            key: '2',
            label: '招聘人数',
            children: post.recruitNum,
        },
        {
            key: '3',
            label: '正式/实习',
            children: post.workType ? post.workType : '不限',
        },
        {
            key: '4',
            label: '远程/线下',
            children: post.workStyle ? post.workStyle : '不限',
        },
        {
            key: '5',
            label: '工作经验要求',
            children: post.workYearReq ? `${post.workYearReq}年` : '不限',
        },
        {
            key: '6',
            label: '岗位描述',
            children: <span style={{textIndent: '2em', textAlign: 'left'}}>
                {post.description}
            </span>,
        },
        {
            key: '7',
            label: '岗位职责',
            children: <span style={{textIndent: '2em', textAlign: 'left'}}>
                {post.responsibility}
            </span>,
        }

    ];

    return <div>
        <Row>
            <div style={{marginLeft: '650px'}}>
                <Title style={{textAlign: "center", fontSize: "30px"}}> {post.postName} </Title>
                <Row align="middle" justify="center"
                     style={{fontSize: '16px', marginTop: '30px', color: 'gray'}}>
                    <span>
                        <EnvironmentOutlined style={{marginRight: '4px'}}/> {post.city}
                        <TagOutlined style={{marginLeft: '20px', marginRight: '4px'}}/> {post.onSiteDayReq}天/周
                        <BookOutlined style={{marginLeft: '20px', marginRight: '4px'}}/> {post.degreeReq}
                        { department &&
                            <div>
                                <TeamOutlined style={{marginLeft: '20px'}}/> {department}
                            </div>
                        }
                    </span>
                </Row>
            </div>
            <Text style={{
                marginLeft: '100px',
                marginTop: '40px',
                fontSize: '24px',
                color: 'darkslategray'
            }}>{post.salary}k</Text>
        </Row>

        <Divider/>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '10px'
        }}>
            <Col span={10}>
                <Descriptions column={1}
                              items={basicItems}
                              labelStyle={{fontSize: '16px', marginTop: '20px'}}
                              contentStyle={{fontSize: '16px', marginTop: '20px', marginLeft: '5px'}}/>
            </Col>
        </div>
    </div>
}