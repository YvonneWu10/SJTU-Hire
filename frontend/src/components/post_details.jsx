import { Button, Col, Descriptions, Row } from "antd";
import { Divider, Typography } from 'antd';
import React from "react";
import { EnvironmentOutlined, TagOutlined, BookOutlined, TeamOutlined } from "@ant-design/icons";
import {
    acceptInvitationByPostId,
    deliverByPostId,
    endProcessByPostId,
    refuseInvitationByPostId
} from "../service/candPost";
import { refreshPage } from "../utils/refresh";
const { Title, Text } = Typography;

// 岗位详情
export default function PostDetails({ post, department, timeout, delivered, ended, invited, admitted }) {
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

    const endPorcessOnClick = () => {
        endProcessByPostId(post.postId);
        refreshPage();
    }

    const deliverOnClick = () => {
        deliverByPostId(post.postId);
        refreshPage();
    }

    const acceptOnClick = () => {
        acceptInvitationByPostId(post.postId);
        refreshPage();
    }

    const refuseOnClick = () => {
        refuseInvitationByPostId(post.postId);
        refreshPage();
    }

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
                        <TeamOutlined style={{marginLeft: '20px'}}/> {department}
                    </span>
                </Row>
            </div>
            <Text style={{
                marginLeft: '100px',
                marginTop: '40px',
                fontSize: '24px',
                color: 'darkslategray'
            }}>{post.salary}k</Text>
            <div style={{position: 'absolute', right: 180, top: 70}}>
                { admitted ? <Button disabled className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 18, letterSpacing: 4 }}>已录取</Button> :
                    ((delivered && !ended) ? <Button onClick={ endPorcessOnClick } className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 16, letterSpacing: 2 }} >结束流程</Button> :
                        ( ended ? <Button disabled className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 13, letterSpacing: 1 }}>已结束流程</Button> :
                                (timeout ? <Button disabled className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 18, letterSpacing: 4 }}>未开放</Button> :
                                        ( invited ? (<div>
                                                <Button onClick={ acceptOnClick } className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 16, letterSpacing: 2, position: 'absolute', right: 60 }}>接受邀请</Button>
                                                <Button onClick={ refuseOnClick } className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 16, letterSpacing: 2, position: 'absolute', right: -60 }}>拒绝邀请</Button>
                                            </div>) :
                                            <Button onClick={ deliverOnClick } className={"ant-button-primary"} style={{ width: 100, height: 50, fontSize: 18, letterSpacing: 4 }}>投递</Button>)
                                )
                        )
                    )
                }
            </div>
        </Row>

        <Divider/>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Col span={10}>
                <Descriptions column={1}
                              items={basicItems}
                              labelStyle={{fontSize: '16px', marginTop: '15px'}}
                              contentStyle={{fontSize: '16px', marginTop: '15px', marginLeft: '5px'}}/>
            </Col>
        </div>
    </div>
}