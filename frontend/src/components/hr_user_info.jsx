import { Row, Space } from "antd";
import { Divider, Typography } from 'antd';
import React from "react";

const { Title, Text } = Typography;

export default function HRUserDetails({ hr, company, department }) {
    console.log(hr);
    console.log(department);
    return <Row>
        <Typography>
            <Title> {hr.hrname} </Title>
            <Divider/>
            <Space direction="vertical">
                <Text> {company.companyName} </Text>
                <Text> {department.departmentName} </Text>
            </Space>
        </Typography>
    </Row>
}