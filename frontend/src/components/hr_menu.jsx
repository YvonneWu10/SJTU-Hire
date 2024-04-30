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
import type {MenuProps} from "antd";
import {Header} from "antd/es/layout/layout";

const { Sider } = Layout;
const { Text } = Typography;

const HRMenu = ({}) => {
    const location = useLocation();
    const getKeyFromPath = (path) => {
        // Map the path to the corresponding key
        const keyMap = {
            "/hr_view": "0",  // Home page key
            "/hr_view/managePosts": "1",
            "/hr_view/findCandidates": "2",
        };
        if (path.includes("managePosts")){
            return "1";
        } else if (path.includes("findCandidates")){
            return "2";
        } else if (path.includes("user")){
            return "3"
        }
        return "0";  // Default to "1" if path is not found
    };

    return (
        <div>
            <Header style={{background: '#fff', padding: 0, display: 'flex', alignItems: 'center'}}>
                <img src="/images/logo1.png" alt="Logo" style={{height: '50px', marginLeft: '20px'}}/>
                <img src="/images/logo2.png" alt="Logo" style={{height: '50px', marginLeft: '20px'}}/>
                <Menu selectedKeys={[getKeyFromPath(location.pathname)]} mode="horizontal" style={{position: 'relative', top: 0, left: 10, marginBottom:-10}}>
                    <Menu.Item key="0" >
                        <Link to="/hr_view">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/hr_view/managePosts">岗位管理</Link>
                    </Menu.Item>
                    <Menu.Item key="2" style={{float:"right"}}>
                        <Link to="/hr_view/findCandidates">找人</Link>
                    </Menu.Item>
                </Menu>
                <Menu selectedKeys={[getKeyFromPath(location.pathname)]} mode='horizontal' style={{position: 'absolute', top: 10, right: 10}}>
                    <Menu.Item key="3" >
                        <Link to="/hr_view/user">个人中心</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        </div>
    );
};

export default HRMenu;
