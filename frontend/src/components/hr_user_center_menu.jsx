import React from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
    InboxOutlined,
    ShopOutlined,
    ProfileOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    HomeOutlined
} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import type {MenuProps} from "antd";
import {Header} from "antd/es/layout/layout";

const { Sider } = Layout;
const { Text } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

// HR的个人中心的侧边栏，用于进入不同的个人中心功能页
const HRUserCenterMenu = ({}) => {
    let navigate = useNavigate();
    const handleEdit = () => {
        let url = `/hr_view/user/editCompany/`
        navigate(url);
    }

    const handleChangePassword = () => {
        let url = `/hr_view/user/editPassword/`
        navigate(url);
    }

    const handlePersonalInfo = () => {
        let url = `/hr_view/user/personalInfo/`
        navigate(url);
    }
    const items: MenuItem[] = [
        {
            key: '1',
            label: '个人信息',
            onClick: handlePersonalInfo,
        },
        {
            key: '2',
            label: '公司信息维护',
            onClick: handleEdit,
        },
        {
            key: '3',
            label: '修改密码',
            onClick: handleChangePassword,
        },
    ];

    const location = useLocation();
    const getKeyFromPath = (path) => {
        // Map the path to the corresponding key
        if (path.includes("personalInfo")){
            return "1";
        } else if (path.includes("editCompany")){
            return "2";
        } else if (path.includes("editPassword")){
            return "3"
        }
        return "1";  // Default to "1" if path is not found
    };

    return (
        <div>
            <Menu selectedKeys={[getKeyFromPath(location.pathname)]} mode='inline' items={items}>
            </Menu>
        </div>
    );
};

export default HRUserCenterMenu;
