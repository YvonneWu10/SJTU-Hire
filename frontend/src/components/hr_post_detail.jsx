import { Row, Space } from "antd";
import { Divider, Typography } from 'antd';
import React from "react";

const { Title, Text } = Typography;

export default function HRPostDetails({ post }) {
    return <Row>
        <Typography>
            <Title> {post.postName} </Title>
            <Divider/>
            <Space direction="vertical">
                <Text> {post.degreeReq} </Text>
                <Text> {post.workYearReq} </Text>
                <Text> {post.onSiteDayReq} </Text>
                <Text> {post.city} </Text>
                <Text> {post.openDate} </Text>
                <Text> {post.endDate} </Text>
                <Text> {post.recruitNum} </Text>
                <Text> {post.salary} </Text>
                <Text> {post.workStyle} </Text>
                <Text> {post.workType} </Text>
            </Space>
        </Typography>
    </Row>
}