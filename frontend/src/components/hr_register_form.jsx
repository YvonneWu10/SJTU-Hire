import '../css/global.css'

import {Button, Form, Input, message, Modal, Row, Select, Space} from "antd"
import { useNavigate } from "react-router-dom";
import { candidateRegister } from "../service/candidate";
import React, {useEffect, useState} from "react";
import {retPostCities} from "../service/post";
import {getAllCompanyNames} from "../service/company";
import {HRRegister} from "../service/hr_user";
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

//初始表格，用于输入姓名和公司名
function InitialForm({onFinish}) {
    return (
        <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginLeft:"-5%"}}>
        <Form {...formItemLayout} onFinish={onFinish} scrollToFirstError>
            <Form.Item name="HRName" label={'姓名'}
                       rules={[{required: true, message: "请输入姓名"}]}>
                <Input allowClear style={{width: '100%'}}></Input>
            </Form.Item>

            <Form.Item name="companyName" label={'公司名称'}
                       rules={[{required: true, message: "请输入公司准确名称"}]}>
                <Input allowClear style={{width: '100%'}}></Input>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" style={{marginLeft:"50%"}}>
                    下一步
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}

// 如果发现公司名没有出现在数据库中，则跳转进行公司的注册
function CompanyRegisterForm({ companyName, onFinish, onBackward}) {
    return (
        <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginLeft:"-5%"}}>
        <Form {...formItemLayout} onFinish={onFinish} scrollToFirstError>
            <Form.Item name="companyName" label={'公司名称'} initialValue={companyName}
                       rules={[{required: true, message: "请输入公司准确名称"}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name="companyScale" label={'公司规模'} rules={[{message: "请输入公司规模"}]}>
            <Select placeholder="请选择公司规模">
                <Option value="10-99人">10-99人</Option>
                <Option value="100-999人">100-999人</Option>
                <Option value="1000-5000人">1000-5000人</Option>
                <Option value="5000人以上">5000人以上</Option>
            </Select>
            </Form.Item>
            <Form.Item name="financingStage" label={'公司融资阶段'} rules={[{message: "请输入公司融资阶段"}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name="companyType" label={'公司类型'} rules={[{message: "请输入公司类型"}]}>
                <Select placeholder="请选择公司类型">
                    <Option value="民营">民营</Option>
                    <Option value="国企">国企</Option>
                    <Option value="外企">外企</Option>
                </Select>
            </Form.Item>
            <Form.Item name="companyField" label={'公司领域'} rules={[{message: "请输入公司领域"}]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name="description" label={'公司描述'} rules={[{message: "请输入公司描述"}]}>
                <Input.TextArea rows={3} ></Input.TextArea>
            </Form.Item>

            <Form.Item name="companyToken" label={'公司Token'}
                       rules={[{required: true, message: "请输入公司Toekn，后续无法更改"},
                           {pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z\d]{6,12}$/, message: "Token必须是6-12位的数字字母组合"}]}>
                <Input></Input>
            </Form.Item>

            {/*<Form.Item>*/}
            {/*    <Button type="primary" htmlType="submit" style={{marginLeft:"50%"}}>*/}
            {/*        下一步*/}
            {/*    </Button>*/}
            {/*</Form.Item>*/}
            <Row align={"center"}>
                <Button onClick={onBackward}> 上一步 </Button>
                <Button type="primary" htmlType="submit" style={{marginLeft:10}}>
                    下一步
                </Button>
            </Row>
        </Form>
        </div>
    )
}

// 用于输入部门的名城和公司的Token，若部门不存在则直接进行注册；都需要进行token的验证
function DepartmentForm({onFinish, onBackward}) {
    return (
        <Form {...formItemLayout} onFinish={onFinish} scrollToFirstError>
            <Form.Item name="departmentName" label={'部门名称'}
                       rules={[{required: true, message: "请输入部门准确名称"}]}>
                <Input></Input>
            </Form.Item>

            <Form.Item name="companyToken" label={'公司Token'}
                       rules={[{required: true, message: "请输入公司Token"}]}>
                <Input></Input>
            </Form.Item>

            <Row align={"center"}>
                <Button onClick={onBackward}> 上一步 </Button>
                <Button type="primary" htmlType="submit" style={{marginLeft:10}}>
                    下一步
                </Button>
            </Row>
        </Form>
    )
}

// 用于输入密码并进行注册
function PasswordForm({onFinish, onBackward}) {
    return (
        <div style={{display: "flex", justifyContent:"center", alignItems:"center", marginLeft:"-5%"}}>
        <Form {...formItemLayout} onFinish={onFinish} scrollToFirstError>
            <Form.Item name="password" label={'密码'}
                       rules={[{required: true, message: "请设置密码"},
                           {pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z\d]{6,12}$/, message: "密码必须是6-12位的数字字母组合"}]}>
                <Input.Password ></Input.Password>
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
                <Input.Password allowClear></Input.Password>
            </Form.Item>

            <Row align={"center"}>
                <Button onClick={onBackward}> 上一步 </Button>
                <Button type="primary" htmlType="submit" style={{marginLeft:10}}>
                    注册
                </Button>
            </Row>
        </Form>
        </div>
    )
}

// 主表格，用于流程的控制
export default function HRRegisterForm() {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [initialInfo, setInitialInfo] = useState(null);
    const [companyNames, setCompanyNames] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [departmentInfo, setDepartmentInfo] = useState(null);
    // const [passwordInfo, setPasswordInfo] = useState(null);

    const info = (hrId) => {
        Modal.info({
            title: '提醒事项',
            content: (
                <div>
                    <p>你的用户名为 {hrId} </p>
                    <p>请务必牢记，若遗忘，请联系管理员</p>
                </div>
            ),
            onOk() {},
        });
    };

    const onFinishInitialForm = (value) => {
        setInitialInfo(value);
        let companyName = value["companyName"];
        if (companyNames.indexOf(companyName) > -1){
            setCurrent(2);
        } else {
            setCurrent(1);
        }
    };

    const onFinishCompanyRegisterForm = (value) => {
        setCompanyInfo(value);
        setCurrent(2);
    };

    const onFinishDepartmentForm = (value) => {
        setDepartmentInfo(value);
        setCurrent(3);
    };

    const onClickBackward = () => {
        setCurrent(current - 1);
    };

    const onFinishPasswordForm = async (value) => {
        let result = {
            "initial": initialInfo,
            "companyInfo": companyInfo,
            "departmentInfo": departmentInfo,
            "passwordInfo": value,
        }
        let res = await HRRegister(result);
        if (res.ok) {
            message.success(res.message);
            info(res.hrId);
            navigate(`/login`);
        } else {
            message.error(res.message);
        }
    };

    const forms = [
        <InitialForm onFinish={onFinishInitialForm} />,
        <Space direction="vertical" style={{ width: "100%" }}> {initialInfo && <CompanyRegisterForm companyName={initialInfo["companyName"]}
                                                                                                    onFinish={onFinishCompanyRegisterForm} onBackward={onClickBackward} />} </Space>,
        <DepartmentForm onFinish={onFinishDepartmentForm} onBackward={onClickBackward}/>,
        <PasswordForm onFinish={onFinishPasswordForm} onBackward={onClickBackward}/>
    ];

    const getCompanyNames = async () => {
        let res = await getAllCompanyNames();
        setCompanyNames(res);
    };

    useEffect(() => {
        getCompanyNames();
    }, []);

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
            {forms[current]}
        </div>
    );
}