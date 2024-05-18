import '../css/global.css'

import {Card, Typography} from "antd";

import { BasicLayout } from "../components/layout";
import CandidateRegisterForm from "../components/candidateRegister_form";
import React from "react";
const { Title, Paragraph } = Typography;


export default function CandidateRegisterPage() {
    return (
        <BasicLayout>
            <div className="flex">
                <Card className="card-container">
                    <Title level={2} style={{textAlign: 'center'}}>求职者注册</Title>
                    <CandidateRegisterForm/>
                    <div style={{marginLeft: '40%', marginTop: '8%'}}>
                        <Paragraph>注意:</Paragraph>
                        <Paragraph>1. 注册成功后，身份证号即为用户名</Paragraph>
                        <Paragraph>2. 其余信息请至个人中心修改</Paragraph>
                    </div>
                </Card>
            </div>
        </BasicLayout>
    );
}