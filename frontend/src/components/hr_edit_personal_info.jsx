import {Button, Col, Form, Input, message, Row, Select, Space} from "antd";
import { Divider, Typography } from 'antd';
import React from "react";
import HRUserCenterMenu from "./hr_user_center_menu";
import {hrEditPost} from "../service/hr_post_view";
import {useNavigate} from "react-router-dom";
import {HR_EditCompany, HR_EditPersonalInfo} from "../service/hr_user";

const { Title, Text } = Typography;
const { Option } = Select;

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
export default function HREditPersonalInfo({ hr, company, department }) {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const refreshPage = () => {
        window.location.reload();
    }
    const onFinish = async (fieldsValue: any) => {
        const values = {
            ...fieldsValue,
            'hrId': hr.hrid,
            'companyId': hr.companyId,
            'departmentId': hr.departmentId,
        };
        let res = await HR_EditPersonalInfo(values);

        if (res.ok) {
            message.success(res.message);
            navigate("/hr_view/user/personalInfo");
        } else {
            message.error(res.message);
        }
        // console.log('Received values of form: ', values);
    };
    console.log(hr);

    return <div>
        <Row>
            <Col span={5}>
                <HRUserCenterMenu/>
            </Col>
            <Col span={19}>
                <Form {...formItemLayout}
                      form={form}
                      name="editPersonalInfo"
                      onFinish={onFinish}
                      scrollToFirstError
                      style={{marginLeft:"-20%"}}>

                    <Form.Item name="HRName" label={'姓名'} initialValue={hr.hrname} rules={[{required: true, message: "请输入姓名"}]}>
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                    <Form.Item name="departmentName" label={'部门名称'} initialValue={department.departmentName} rules={[{required: true, message: "请输入公司修改Token"}]}>
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                    <Form.Item wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 24, offset: 10 } }}>
                        <Button type="primary" htmlType="submit">
                            提交修改
                        </Button>
                    </Form.Item>

                </Form>
            </Col>
        </Row>
    </div>
}