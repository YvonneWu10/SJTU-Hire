import {Button, Col, Form, Input, message, Row, Select, Space} from "antd";
import { Divider, Typography } from 'antd';
import React from "react";
import HRUserCenterMenu from "./hr_user_center_menu";
import {hrEditPost} from "../service/hr_post_view";
import {useNavigate} from "react-router-dom";
import {HR_EditCompany} from "../service/hr_user";

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
export default function HREditCompany({ hr, company, department }) {
    const [form] = Form.useForm();

    const navigate = useNavigate();
    const refreshPage = () => {
        window.location.reload();
    }
    const onFinish = async (fieldsValue: any) => {
        const values = {
            ...fieldsValue,
            'companyId': company.companyId,
        };
        let res = await HR_EditCompany(values);

        if (res.ok) {
            message.success(res.message);
            refreshPage();
        } else {
            message.error(res.message);
        }
        // console.log('Received values of form: ', values);
    };
    console.log(company);

    return <div>
        <Row>
            <Col span={5}>
                <HRUserCenterMenu/>
            </Col>
            <Col span={19}>
                <Form {...formItemLayout}
                      form={form}
                      name="editCompany"
                      onFinish={onFinish}
                      scrollToFirstError
                      style={{marginLeft:"-20%"}}>

                    <Form.Item name="companyName" label={'公司名称'} initialValue={company.companyName} rules={[{required: true, message: "请输入公司名称"}]}>
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                    <Form.Item name="companyScale" label={'公司规模'} initialValue={company.companyScale} rules={[{message: "请输入公司规模"}]}>
                        <Select placeholder="请选择公司规模" style={{width: '80%'}}>
                            <Option value="10-99人">10-99人</Option>
                            <Option value="100-999人">100-999人</Option>
                            <Option value="1000-5000人">1000-5000人</Option>
                            <Option value="5000人以上">5000人以上</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="financingStage" label={'公司融资阶段'} initialValue={company.financingStage} rules={[{message: "请输入公司融资阶段"}]}>
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                    <Form.Item name="companyType" label={'公司类型'} initialValue={company.companyType} rules={[{message: "请输入公司类型"}]}>
                        <Select placeholder="请选择公司类型" style={{width: '80%'}}>
                            <Option value="民营">民营</Option>
                            <Option value="国企">国企</Option>
                            <Option value="外企">外企</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="companyField" label={'公司领域'} initialValue={company.companyField} rules={[{message: "请输入公司领域"}]}>
                        <Input style={{ width: '80%'}}></Input>
                    </Form.Item>
                    <Form.Item name="description" label={'公司描述'} initialValue={company.description} rules={[{message: "请输入公司描述"}]}>
                        <Input.TextArea rows={3} style={{ width: '80%'}}></Input.TextArea>
                    </Form.Item>
                    <Form.Item name="companyToken" label={'公司修改Token'} rules={[{required: true, message: "请输入公司修改Token"}]}>
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