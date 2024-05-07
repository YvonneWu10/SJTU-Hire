import '../css/global.css'

import { Avatar, Button, Card, Menu, Space } from "antd";
import { useEffect, useState } from "react";

import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { searchCandidateUsername } from "../service/candidate";
import { getCompanyById } from "../service/company";
import CompanyDetails from "../components/company_details";
import PostList from "../components/post_list";


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
        label: (<Link to="/candidate_view/Delivery">投递列表</Link>),
        key: 'deliveryList',
    },
];


export default function CompanyPage() {
    const [posts, setPosts] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [company, setCompany] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [user, setUser] = useState("");
    const [curMenu, setCurMenu] = useState(null);
    const [curDepartment, setCurDepartment] = useState((0).toString());
    const [departmentItems, setDepartmentItems] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;

    let { companyId } = useParams();

    const getUserName = async () => {
        let resUser = await searchCandidateUsername();
        setUser(resUser);
    };

    const getCompany = async () => {
        // console.log(`inital curDepartment in getCompany: ${curDepartment} ${typeof curDepartment}`);
        let resCompanyInfo = await getCompanyById(companyId);
        let resPosts = resCompanyInfo.posts;
        let resCompany = resCompanyInfo.company;
        let resDepartments = resCompanyInfo.departments;
        setPosts(resPosts);
        setCompany(resCompany);
        setDepartments(resDepartments);
    }

    useEffect(() => {
        // console.log(`Entering useEffect in CompanyPage with companyId: ${companyId}`);
        getUserName();
        getCompany();
    }, []);

    useEffect(() => {
        const resDepartmentItems: MenuProps['items'] = departments ? departments.map((department, index) => {
             return {
                label: department.departmentName,
                key: index
             };
        }) : [];
        setDepartmentItems(resDepartmentItems);
        if (departments) {
            setCurDepartment(0);
            setDisplayPosts(posts[0]);
            setTotalPage(Math.ceil(posts[0].length / pageSize));
        }
    }, [departments]);

    const menuOnClick: MenuProps['onClick'] = (event) => {
        setCurMenu(event.key);
    };

    const departmentMenuOnClick: MenuProps['onClick'] = (event) => {
        console.log(`departmentMenuOnClick: ${event.key} ${typeof event.key}`);
        setCurDepartment(event.key);
        setDisplayPosts(posts[event.key]);
        setTotalPage(Math.ceil(posts[event.key].length / pageSize));
    };

    const personalCenterOnClick = () => {
        navigate("/candidate_view/PersonalCenter");
    };

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    return PrivateLayout("candidate", {
            header: (
                <div>
                    <Menu onClick={menuOnClick} selectedKeys={[curMenu]} mode="horizontal" style={{position: 'absolute', top: 15, left: 30}}
                          items={candidateMenuItems}/>
                    <Avatar size="large" icon={<UserOutlined/>} style={{position: 'absolute', top: 25, right: 170}}/>
                    { user && <span className="avatar-subtitle" style={{position: 'absolute', top: 65, right: 160}}>您好，{user}</span> }
                    <Button className={"ant-button-primary"} style={{position: 'absolute', top: 40, right: 50}} onClick={personalCenterOnClick}>个人中心</Button>
                </div>
            )
        }, {
            children: (
                <Card className="card-container">
                    <Space direction="vertical" style={{ width: "100%" }}>
                        { company && <CompanyDetails company={ company } /> }
                        { departments &&
                            <div style={{ width: 1000, marginLeft: 300 }}>
                                <Menu onClick={departmentMenuOnClick} selectedKeys={[curDepartment]} mode="horizontal"
                                      style={{marginTop: 30, marginBottom: 30}} items={departmentItems}/>
                                <PostList posts={displayPosts} pageSize={pageSize} total={totalPage * pageSize}
                                          current={pageIndex} column={ 4 } onPageChange={handlePageChange} />
                            </div>
                        }
                    </Space>
                </Card>
            )
        }
    );
}