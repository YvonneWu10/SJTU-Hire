import {Button, Col, message, Modal, Row, Space} from "antd";
import { Divider, Typography } from 'antd';
import React, {useState} from "react";
import HRUserCenterMenu from "./hr_user_center_menu";
import {useNavigate} from "react-router-dom";
import {HRDeleteAccount} from "../service/hr_user";

const { Title, Text } = Typography;

// 用于展示HR的个人信息的界面
export default function HRUserDetails({ hr, company, department }) {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("HRToken");
        navigate("/login");
    };

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        let res = await HRDeleteAccount();
        if (res.ok) {
            message.success(res.message);
            navigate(`/login`);
        } else {
            message.error(res.message);
        }
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const handleEdit = () => {
        navigate('/hr_view/user/editPersonalInfo');
    }

    return <div>
        <Row gutter={60}>
            <Col span={5}>
                <HRUserCenterMenu/>
            </Col>
            <Col span={19}>
                <Typography>
                    <Title> {hr.hrname} </Title>
                    <Divider/>
                    <Space direction="vertical">
                        <Text> 所属公司： {company.companyName} </Text>
                        <Text> 所在部门： {department.departmentName}部 </Text>
                    </Space>
                </Typography>
                <Divider/>
                <Row size="large" align={'center'} style={{marginTop: 10}}>
                    <Button onClick={handleEdit} style={{width: '120px'}} type="primary"> 修改个人信息 </Button>
                    <Button onClick={handleLogout} style={{width: '100px', marginLeft: 10}}>退出登录</Button>
                    <Button onClick={showModal} style={{width: '100px', marginLeft: 10}} danger>注销账号</Button>
                    <Modal
                        title="提醒"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>是否确认注销账号</p>
                    </Modal>
                </Row>
            </Col>
        </Row>
    </div>
}