import React, {useState} from "react";

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Card, Radio, Space} from 'antd';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import useMessage from "antd/es/message/useMessage";
import { useNavigate } from "react-router-dom";
import { BasicLayout } from "../components/layout";
import { login } from "../service/login";
import { handleBaseApiResponse } from "../utils/message";

const LoginPage = () => {
    const [messageApi, contextHolder] = useMessage();
    const navigate = useNavigate();

    const [type, setType] = useState("candidate");
    console.log(type);

    const onSubmit = async (values) => {
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

    const handleLoginType = (event) => {
        console.log(`Selected Radio value is: ${event.target.value}`);
        setType(event.target.value);
    };

    return (
        <BasicLayout>
            <div className="center-container">
                <Card className="card-container">
                    {contextHolder}
                    <LoginForm
                        // backgroundImageUrl={process.env.PUBLIC_URL + 'login.png'}
                        // logo={process.env.PUBLIC_URL + '/logo.webp'}
                        title="SJTU 直聘"
                        subTitle="2024"
                        onFinish={onSubmit}
                    >
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'请输入用户名'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'}/>,
                            }}
                            placeholder={'密码'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码',
                                },
                            ]}
                        />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Radio.Group defaultValue="candidate" buttonStyle="solid" onChange={handleLoginType}>
                                <Radio.Button value="candidate">应聘者</Radio.Button>
                                <Radio.Button value="HR">招聘者</Radio.Button>
                                <Radio.Button value="admin">管理员</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div
                            style={{
                                marginBlockEnd: 24,
                            }}
                        >
                        </div>
                    </LoginForm>
                </Card>
            </div>
        </BasicLayout>
);
};
export default LoginPage;