import {Col, Descriptions, Row, Space} from "antd";
import { Divider, Typography } from 'antd';
import React from "react";
import { TeamOutlined, RiseOutlined, BankOutlined, CompassOutlined } from "@ant-design/icons";

const { Title } = Typography;

// 公司详情
export default function CompanyDetails({ company }) {
    const basicItems = [
        {
            key: '6',
            label: '公司描述',
            children: <span style={{textIndent: '2em', textAlign: 'left'}}>
                {company.description}
            </span>,
        }
    ];

    return <div>
        <Row>
            <div style={{marginLeft: '650px'}}>
                <Title style={{textAlign: "center", fontSize: "30px"}}> {company.companyName} </Title>
                <Row align="middle" justify="center"
                     style={{fontSize: '16px', marginTop: '30px', color: 'gray'}}>
                    <span>
                        <TeamOutlined style={{marginRight: '4px'}}/> {company.companyScale}
                        <RiseOutlined style={{marginLeft: '20px', marginRight: '4px'}}/> {company.financingStage}
                        <BankOutlined style={{marginLeft: '20px', marginRight: '4px'}}/> {company.companyType}
                        <CompassOutlined style={{marginLeft: '20px', marginRight: '4px'}}/> {company.companyField}
                    </span>
                </Row>
            </div>
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
                              labelStyle={{ fontSize: '16px' }}
                              contentStyle={{ fontSize: '16px', marginLeft: '5px' }}/>
            </Col>
        </div>
    </div>
}