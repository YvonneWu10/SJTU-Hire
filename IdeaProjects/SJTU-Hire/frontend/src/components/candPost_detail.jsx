import {Row, Space, Steps} from "antd";
import { Divider, Typography } from 'antd';
import React from "react";

const { Title, Text } = Typography;

export default function CandPostDetails({ cand, post, candPost}) {
    return <Row>
        <Typography>
            <Title> {cand.candName} </Title>
            <Divider/>
            <Space direction="vertical">
                <Text> {cand.candAge} </Text>
                <Text> {cand.candGender} </Text>
                <Text> {cand.candPhone} </Text>
                <Text> {cand.candMail} </Text>
                <Text> {cand.candProvince} </Text>
                <Text> {cand.candGPA} </Text>
                <Text> {cand.candMentor} </Text>
                <Text> {cand.candPaperNum} </Text>
                <Text> {cand.candDegree} </Text>
                <Text> {cand.candUniversity} </Text>
                <Text> {cand.candMajor} </Text>
                <Text> {cand.candWorkYear} </Text>
                <Text> {cand.candExpectedSalary} </Text>
                <Text> {post.workYearReq} </Text>
                <Text> {post.onSiteDayReq} </Text>
                <Text> {post.city} </Text>
                <Text> {post.openDate} </Text>
                <Text> {post.endDate} </Text>
                <Text> {post.recruitNum} </Text>
                <Text> {post.salary} </Text>
                <Text> {post.workStyle} </Text>
                <Text> {post.workType} </Text>
                <Text> {candPost.submissionDate} </Text>
            </Space>
        </Typography>
        <Steps
            current={1}
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
            ]}
        />
    </Row>

}