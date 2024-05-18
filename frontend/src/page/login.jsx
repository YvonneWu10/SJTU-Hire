import React, {useState} from "react";

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Button, Card, Form, Input, Radio, Space} from 'antd';
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";
import { login } from "../service/login";
import { handleBaseApiResponse } from "../utils/message";
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;


export default function LoginPage() {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const [type, setType] = useState("candidate");
    console.log(type);

    const onLogin = async (values) => {
        let username = values['username'];
        let password = values['password'];

        let res = await login(type, username, password);
        console.log(res);

        if (type === "candidate") {
            handleBaseApiResponse(res, messageApi, () => navigate("/candidate_view/SearchPost"));
            if (res.ok) {
                localStorage.setItem("candidateToken", res.token);
            }
        } else if (type === "HR") {
            handleBaseApiResponse(res, messageApi, () => navigate("/hr_view"));
            if (res.ok) {
                localStorage.setItem("HRToken", res.token);
            }
        }
    };

    const handleRegister = () => {
        if (type === "candidate") {
            navigate("/candidate_view/Register");
        } else if (type === "HR") {
            navigate("/hr_view/Register")
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleLoginType = (event) => {
        console.log(`Selected Radio value is: ${event.target.value}`);
        setType(event.target.value);
    };

    return (
        <BasicLayout>
            <div className="center-container">
                <Card className="card-container">
                    {contextHolder}
                    <div style={{alignItems: "center", justifyContent: "center", marginTop: '5%', marginLeft: '39%', marginRight: '39%'}}>
                        <Title style={{textAlign: 'center'}}>SJTU 直聘</Title>
                        <Paragraph style={{textAlign: 'center', color: '#B0B0B0'}}>2024</Paragraph>
                        <Form
                            form={form}
                            name="login"
                            onFinish={onLogin}
                            onFinishFailed={onFinishFailed}
                            scrollToFirstError
                            requiredMark={false}>
                            <></>
                            <Form.Item name="username" rules={[{required: true, message: "请输入用户名"}]}>
                                <Input allowClear style={{width: '100%'}} prefix={<UserOutlined/>}></Input>
                            </Form.Item>

                            <Form.Item name="password" rules={[{required: true, message: "请输入密码"}]}>
                                <Input.Password style={{width: '100%'}} prefix={<LockOutlined/>}></Input.Password>
                            </Form.Item>

                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Form.Item>
                                    <Radio.Group defaultValue="candidate" className={"ant-radio"} buttonStyle="solid" onChange={handleLoginType}>
                                        <Radio.Button value="candidate">应聘者</Radio.Button>
                                        <Radio.Button value="HR">招聘者</Radio.Button>
                                        <Radio.Button value="admin">管理员</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            <Form.Item>
                                <Button className="ant-button-primary" type="primary" htmlType="submit"
                                        style={{width: '100%', height: 40, fontSize: 15}}>
                                    登录
                                </Button>
                            </Form.Item>

                            <Form.Item>
                                <Button className="ant-button-primary"
                                        style={{width: '100%', height: 40, fontSize: 15}}
                                        onClick={handleRegister}>
                                    注册
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
            </div>
        </BasicLayout>
    );
};