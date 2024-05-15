import '../css/global.css'

import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom";
import { candidateChangePassword } from "../service/candidate";

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


export default function CandidateChangePasswordForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();


    const changePasswordOnFinish = async (values) => {
        let res = await candidateChangePassword(values);
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
                name="editCandidate"
                onFinish={changePasswordOnFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                style={{width: '80%', marginTop: '10%', alignItems: "center", justifyContent: "center"}}>
                <Form.Item name="oldPassword" label={'原密码'}
                           rules={[{required: true, message: "请输入原密码"}]}>
                    <Input.Password allowClear style={{width: '40%'}}></Input.Password>
                </Form.Item>

                <Form.Item name="newPassword" label={'新密码'}
                           rules={[{required: true, message: "请输入新密码"},
                               {pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z\d]{6,12}$/, message: "密码必须是6-12位的数字字母组合"}]}>
                    <Input.Password allowClear style={{width: '40%'}}></Input.Password>
                </Form.Item>

                <Form.Item name="confirmedPassword" label={'确认密码'}
                           rules={[{required: true, message: "请确认密码"},
                               ({ getFieldValue }) => ({
                                   validator(_, value) {
                                       if (!value || getFieldValue('newPassword') === value) {
                                           return Promise.resolve();
                                       }
                                       return Promise.reject(new Error('两次输入的密码不一致'));
                                   },
                               })]}>
                    <Input.Password allowClear style={{width: '40%'}}></Input.Password>
                </Form.Item>

                <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 24, offset: 11}}}>
                    <Button className="ant-button-primary" type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </div>
    );
}