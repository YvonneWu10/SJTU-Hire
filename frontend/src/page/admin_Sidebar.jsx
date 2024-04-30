// Sidebar.js
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
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Text } = Typography;

const Sidebar = ({ collapsed, setCollapsed }) => {
    const location = useLocation();
    const getKeyFromPath = (path) => {
        // Map the path to the corresponding key
        const keyMap = {
            "/": "0",  // Home page key
            "/job-management": "1",
            "/company-management": "2",
            "/resume-management": "3",
            "/user-management": "4",
            "/statistics": "5"
        };
        return keyMap[path] || "1";  // Default to "1" if path is not found
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint="lg"
            collapsedWidth="0"
            width={200}
            className="site-layout-background"
        >
            <div style={{padding: '16px', textAlign: 'center', backgroundColor: 'white'}}>
                <Avatar size={64} src="/images/00.png"/>
                <div style={{marginTop: '8px'}}>
                    <Text strong={!collapsed}>管理杨</Text>
                </div>
            </div>
            <Menu mode="inline" defaultSelectedKeys={[getKeyFromPath(location.pathname)]} style={{height: '100%', borderRight: 0}}>
                <Menu.Item key="0" icon={<HomeOutlined />}>
                    <Link to="/">主页</Link>
                </Menu.Item>
                <Menu.Item key="1" icon={<InboxOutlined />}>
                    <Link to="/job-management">岗位管理</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShopOutlined />}>
                    <Link to="/company-management">公司管理</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ProfileOutlined />}>
                    <Link to="/resume-management">简历管理</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<UserSwitchOutlined />}>
                    <Link to="/user-management">用户管理</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<BarChartOutlined />}>
                    <Link to="/statistics">统计分析</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
