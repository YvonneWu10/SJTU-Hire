import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from './admin_Sidebar'; // 确保路径正确

const { Header, Content } = Layout;

const SidebarLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout style={{padding: '0 24px 24px'}}>
                <Header style={{background: '#fff', padding: 0, display: 'flex', alignItems: 'center'}}>
                    <img src="/images/logo1.png" alt="Logo" style={{height: '50px', marginLeft: '20px'}}/>
                    <img src="/images/logo2.png" alt="Logo" style={{height: '50px', marginLeft: '20px'}}/>
                </Header>
                <Content style={{padding: '0 50px', marginTop: 24}}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default SidebarLayout;