import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { getMe } from "../service/user";
import { UserContext } from "../utils/context";

// 未登录时的Layout
export function BasicLayout({ children }) {
    return (
        <Layout className="basic-layout">
            <Header className="header">
                <img src="/images/logo1.png" alt="Logo"
                     style={{height: '50px', position: 'absolute', top: 25, left: 30}}/>
                <img src="/images/logo2.png" alt="Logo"
                     style={{height: '50px', position: 'absolute', top: 25, left: 90}}/>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer className="footer">
                SJTU直聘 {new Date().getFullYear()}
            </Footer>
        </Layout>
    )
}

// 登录后的Layout
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
            <Footer className={"footer"}>
                SJTU直聘 {new Date().getFullYear()}
            </Footer>
        </Layout>
    )
}