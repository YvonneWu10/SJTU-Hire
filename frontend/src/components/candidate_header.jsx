import { Avatar, Button, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { searchCandidateUsername } from "../service/candidate";
import type { MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";

const candidateMenuItems: MenuProps['items'] = [
    {
        label: (<Link to="/candidate_view/SearchPost">岗位查找</Link>),
        key: 'postSearch',
    },
    {
        label: (<Link to="/candidate_view/SearchCompany">公司查找</Link>),
        key: 'companySearch',
    },
    {
        label: '投递列表',
        key: 'deliveryList',
        children:  [
            {
                label: (<Link to="/candidate_view/Invited">邀请</Link>),
                key: 'invited'
            },
            {
                label: (<Link to="/candidate_view/Delivered">流程中</Link>),
                key: 'delivered'
            },
            {
                label: (<Link to="/candidate_view/Ended">流程终止</Link>),
                key: 'ended'
            }
        ],
    },
];

export default function CandidateHeader(initialMenu) {
    const [user, setUser] = useState("");
    const [curMenu, setCurMenu] = useState(initialMenu.initialMenu);

    const navigate = useNavigate();

    const getUserName = async () => {
        let resUser = await searchCandidateUsername();
        setUser(resUser);
    };

    const menuOnClick: MenuProps['onClick'] = (event) => {
        setCurMenu(event.key);
    };

    const personalCenterOnClick = () => {
        navigate("/candidate_view/PersonalCenter");
    };

    const handleLogout = () => {
        localStorage.removeItem("candidateToken");
        navigate("/login");
    };

    useEffect(() => {
        getUserName();
    }, []);

    const items = [
        {
            label: '退出',
            key: '退出',
            onClick: () => handleLogout()
        },
        {
            label:'修改密码',
            key: '修改密码',
            onClick: () => navigate("/candidate_view/ChangePassword")
        },
        {
            label: '注销',
            key: '注销',
            onClick: () => navigate("/candidate_view/DeleteAccount")
        }
    ];

    return <div>
        <img src="/images/logo1.png" alt="Logo" style={{height: '50px', position: 'absolute', top: 25, left: 30}}/>
        <img src="/images/logo2.png" alt="Logo" style={{height: '50px', position: 'absolute', top: 25, left: 90}}/>
        <Menu className={"candidate-menu-submenu-title"} onClick={menuOnClick} selectedKeys={[curMenu]}
              mode="horizontal"
              style={{position: 'absolute', top: 15, left: 300}}
              items={candidateMenuItems}/>

        <Avatar size="large" icon={<UserOutlined/>} style={{position: 'absolute', top: 25, right: 170}}/>
        {user && <span className="avatar-subtitle"
                       style={{position: 'absolute', top: 65, right: 160}}>您好，{user}</span>}
        <Dropdown menu={{items}} placement="bottomLeft">
            <Button className={"ant-button-primary"} style={{position: 'absolute', top: 40, right: 50}}
                    onClick={personalCenterOnClick}>个人中心</Button>
        </Dropdown>
    </div>

}