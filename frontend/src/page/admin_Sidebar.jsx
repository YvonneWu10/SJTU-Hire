// Sidebar.js
import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Typography } from 'antd';
import {
    InboxOutlined,
    ShopOutlined,
    ProfileOutlined,
    UserSwitchOutlined,
    BarChartOutlined,
    HomeOutlined, UserOutlined
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import {getAdminnameByToken} from '../service/admin'
import Identicon from 'identicon.js';
import md5 from 'md5';

const { Sider } = Layout;
const { Text, Title } = Typography;

const Sidebar = ({ collapsed, setCollapsed }) => {
    const [adminName, setAdminName] = useState('加载中...'); // 初始状态设置为“加载中...”
    const [avatar, setAvatar] = useState(null); // 新增状态存储头像
    const location = useLocation();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const fetchedName = await getAdminnameByToken();
                setAdminName(fetchedName || '未知管理员'); // 如果没有获取到名字，则显示“未知管理员”
                const hash = md5(fetchedName || '未知管理员'); // 生成哈希值
                const data = new Identicon(hash, 64).toString(); // 生成64x64像素的图标
                setAvatar(`data:image/png;base64,${data}`);
            } catch (error) {
                console.error('Error fetching admin name:', error);
                setAdminName('未知管理员'); // 错误处理
            }
        };

        fetchAdminName();
    }, []); // 空依赖数组表示此 effect 只在组件加载时运行一次

    const getKeyFromPath = (path) => {
        // Map the path to the corresponding key
        const keyMap = {
            "/administer-main": "0",  // Home page key
            "/job-management": "1",
            "/company-management": "2",
            "/resume-management": "3",
            "/candidate-management": "4",
            "/HR-management": "5",
            "/statistics": "6"
        };
        return keyMap[path] || "0";  // Default to "1" if path is not found
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
                <Avatar size={64} icon={!avatar && <UserOutlined />} src={avatar} /> {/* 使用生成的 avatar */}
                <div style={{marginTop: '8px'}}>
                    <Text strong={!collapsed}>{adminName}</Text> {/* 使用状态中的 adminName */}
                </div>
            </div>
            <Menu mode="inline" defaultSelectedKeys={[getKeyFromPath(location.pathname)]} style={{height: '100%', borderRight: 0}}>
                <Title style={{ color: '#bbbbbb', fontSize:'15px', marginLeft: '20px' }}>主页</Title>
                <Menu.Item key="0" icon={<HomeOutlined />}>
                    <Link to="/administer-main">主页</Link>
                </Menu.Item>
                <Title style={{ color: '#bbbbbb', fontSize:'15px', marginLeft: '20px' }}>信息管理</Title>
                <Menu.Item key="1" icon={<InboxOutlined />}>
                    <Link to="/job-management">岗位管理</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<ShopOutlined />}>
                    <Link to="/company-management">公司管理</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ProfileOutlined />}>
                    <Link to="/resume-management">投递管理</Link>
                </Menu.Item>
                <Title style={{ color: '#bbbbbb', fontSize:'15px', marginLeft: '20px' }}>用户管理</Title>
                <Menu.Item key="4" icon={<UserSwitchOutlined />}>
                    <Link to="/candidate-management">招聘者管理</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<UserSwitchOutlined />}>
                    <Link to="/HR-management">HR管理</Link>
                </Menu.Item>
                <Title style={{ color: '#bbbbbb', fontSize:'15px', marginLeft: '20px' }}>统计分析</Title>
                <Menu.Item key="6" icon={<BarChartOutlined />}>
                    <Link to="/statistics">统计分析</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
