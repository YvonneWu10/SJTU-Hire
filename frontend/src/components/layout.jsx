import { Layout, Space } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { getMe } from "../service/user";
import { UserContext } from "../utils/context";

export function BasicLayout({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header"></Header>
            <Content>
                {children}
            </Content>
            <Footer className="footer">
                SJTU直聘 {new Date().getFullYear()}
            </Footer>
        </Layout>
    )
}

export function PrivateLayout(type, { header }, { children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const checkLogin = async () => {
        let me = await getMe(type);
        if (me == null || me === "") {
            navigate("/login");
        } else {
            setUser(me);
            console.log(`Context ${me} stored`)
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <Layout className="basic-layout">
            <Header className="header">
                {header}
            </Header>
            <Content>
                {/*页面鉴权后把用户的primary key存在了context中，但是一定要注意不要意外地暴露给不应该访问它的组件*/}
                <UserContext.Provider value={user}>{user && children}</UserContext.Provider>
            </Content>
            <Footer className="footer">
                SJTU直聘 {new Date().getFullYear()}
            </Footer>
        </Layout>
    )
}