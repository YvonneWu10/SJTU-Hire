import '../css/global.css'

import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom";
import { candidateRegister } from "../service/candidate";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 9 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};


export default function CandidateRegisterForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const registerOnFinish = async (values) => {
        let res = await candidateRegister(values);
        if (res.ok) {
            message.success(res.message);
            navigate(`/login`);
        } else {
            message.error(res.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
            <Form
                {...formItemLayout}
                form={form}
                name="candidateDeleteAccount"
                onFinish={registerOnFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                style={{width: '80%', marginTop: '2%', alignItems: "center", justifyContent: "center"}}>
                <Form.Item name="candidateName" label={'姓名'}
                           rules={[{required: true, message: "请输入姓名"}]}>
                    <Input allowClear style={{width: '40%'}}></Input>
                </Form.Item>

                <Form.Item name="candidateId" label={'身份证号'}
                           rules={[{required: true, message: "请输入身份证号"}]}>
                    <Input allowClear style={{width: '40%'}}></Input>
                </Form.Item>

                <Form.Item name="password" label={'密码'}
                           rules={[{required: true, message: "请设置密码"},
                               {pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z\d]{6,12}$/, message: "密码必须是6-12位的数字字母组合"}]}>
                    <Input.Password style={{width: '40%'}}></Input.Password>
                </Form.Item>

                <Form.Item name="confirmedPassword" label={'确认密码'}
                           rules={[{required: true, message: "请确认密码"},
                               ({ getFieldValue }) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('password') === value) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('两次输入的密码不一致'));
                                   },
                               })]}>
                    <Input.Password allowClear style={{width: '40%'}}></Input.Password>
                </Form.Item>

                <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 24, offset: 11}}}>
                    <Button className="ant-button-primary" type="primary" htmlType="submit">注册</Button>
                </Form.Item>
            </Form>
        </div>
    );
}