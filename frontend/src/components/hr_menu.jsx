import React from 'react';
import {Layout, Menu, Avatar, Typography, Dropdown, Button, Space} from 'antd';
import {
    InboxOutlined,
    ShopOutlined,
    ProfileOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    HomeOutlined, DownOutlined
} from '@ant-design/icons';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import type {MenuProps} from "antd";
import {Header} from "antd/es/layout/layout";

const { Sider } = Layout;
const { Text } = Typography;

// HR对应界面的menu，主要包含首页、岗位管理、找人和个人信息
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

    const handleLogout = () => {
        localStorage.removeItem("HRToken");
        navigate("/login");
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: '登出',
            danger: true,
            onClick: handleLogout,
        },
    ]

    const navigate = useNavigate();
    const personalCenterOnClick = () => {
        navigate("/hr_view/user");
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
                <Dropdown menu={{items}} placement="bottomLeft">
                    {/*<a onClick={(e) => e.preventDefault()}>*/}
                    {/*    <Space style={{position: 'absolute', top: "2%", right: 50}}>*/}
                    {/*        个人中心*/}
                    {/*        <DownOutlined />*/}
                    {/*    </Space>*/}
                    {/*</a>*/}
                    <Button onClick={personalCenterOnClick} className={"ant-button-primary"} style={{position: 'absolute', top: "6%", right: 50}}>
                        <Space>
                            个人中心
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                {/*<Menu selectedKeys={[getKeyFromPath(location.pathname)]} mode='horizontal' style={{position: 'absolute', top: 10, right: 10}}>*/}
                {/*    <Menu.Item key="3" >*/}
                {/*        <Link to="/hr_view/user">个人中心</Link>*/}
                {/*    </Menu.Item>*/}
                {/*</Menu>*/}
            </Header>
        </div>
    );
};

export default HRMenu;
