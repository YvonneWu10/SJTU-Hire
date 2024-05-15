import '../css/global.css'

import { Button, Form, Input, message } from "antd"
import { useNavigate } from "react-router-dom";
import { candidateDeleteAccount } from "../service/candidate";

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


export default function CandidateDeleteAccountForm() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const changePasswordOnFinish = async (values) => {
        let res = await candidateDeleteAccount(values);
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
                <Form.Item name="candidateId" label={'身份证号'}
                           rules={[{required: true, message: "请输入身份证号"}]}>
                    <Input allowClear style={{width: '40%'}}></Input>
                </Form.Item>

                <Form.Item name="password" label={'密码'}
                           rules={[{required: true, message: "请输入密码"}]}>
                    <Input.Password allowClear style={{width: '40%'}}></Input.Password>
                </Form.Item>

                <Form.Item wrapperCol={{xs: {span: 24, offset: 0}, sm: {span: 24, offset: 11}}}>
                    <Button className="ant-button-primary" type="primary" htmlType="submit">确认</Button>
                </Form.Item>
            </Form>
        </div>
    );
}