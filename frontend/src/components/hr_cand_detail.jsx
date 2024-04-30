import {Row, Space, Steps} from "antd";
import { Divider, Typography } from 'antd';
import React from "react";

const { Title, Text } = Typography;

export default function HRCandDetail({cand}) {
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
            </Space>
        </Typography>
    </Row>

}