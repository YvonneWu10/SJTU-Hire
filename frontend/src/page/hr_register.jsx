import '../css/global.css'

import {Card, Typography} from "antd";

import { BasicLayout } from "../components/layout";
import CandidateRegisterForm from "../components/candidateRegister_form";
import React from "react";
import HRRegisterForm from "../components/hr_register_form";
const { Title, Paragraph } = Typography;


export default function HRRegisterPage() {
    return (
        <BasicLayout>
            <div className="flex">
                <Card className="card-container">
                    <Title level={2} style={{textAlign: 'center'}}>招聘者注册</Title>
                    <HRRegisterForm/>
                    <div style={{marginLeft: '32%', marginTop: '8%'}}>
                        <Paragraph>注意:</Paragraph>
                        <Paragraph>1. 注册成功后会弹出你的专属用户名，请务必牢记，后续无法修改</Paragraph>
                        <Paragraph>2. 其余信息请至个人中心修改</Paragraph>
                    </div>
                </Card>
            </div>
        </BasicLayout>
    );
}