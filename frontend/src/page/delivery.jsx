import '../css/global.css'

import type {SelectProps, MenuProps} from 'antd';
import {Avatar, Button, Card, Input, Menu, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {retPostCities, searchPosts} from "../service/post";

import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import PostList from "../components/post_list";
import {UserOutlined} from "@ant-design/icons";
import {searchCandidateUsername} from "../service/candidate";
import DeliveredPostList from "../components/deliveredPost_list";
import {searchDeliveredPosts} from "../service/candPost";

const { Search } = Input;


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


export default function DeliveryPage() {
    const [posts, setPosts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [candPosts, setCandPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [user, setUser] = useState("");
    const [curMenu, setCurMenu] = useState('deliveryList');
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 6;
    // const postName = searchParams.get("postName") || "";
    // const city = searchParams.get("city") || "";
    // const workType = searchParams.get("workType") || "";
    // const workStyle = searchParams.get("workStyle") || "";

    const getDeliveredPosts = async () => {
        let resDeliveredPosts = await searchDeliveredPosts(pageIndex, pageSize);
        let resPosts = resDeliveredPosts.posts;
        let resCompanies = resDeliveredPosts.companies;
        let resCandPosts = resDeliveredPosts.candPosts;
        let totalPage = resDeliveredPosts.total;
        setPosts(resPosts);
        setCompanies(resCompanies);
        setCandPosts(resCandPosts);
        setTotalPage(totalPage);
        // console.log(`DeliveryPage posts:`, resPosts);
        // console.log(`DeliveryPage companies:`, resCompanies);
        // console.log(`DeliveryPage candPosts:`, resCandPosts);
    };

    const getUserName = async () => {
        // console.log(`Entering getUserName`);
        let resUser = await searchCandidateUsername();
        setUser(resUser);
    };

    useEffect(() => {
        getUserName();
    }, []);

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getDeliveredPosts();
    }, [pageIndex, pageSize]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const menuOnClick: MenuProps['onClick'] = (event) => {
        setCurMenu(event.key);
    };

    const personalCenterOnClick = () => {
        navigate("/candidate_view/PersonalCenter");
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
                <div className="center-container">
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <DeliveredPostList posts={posts} companies={companies} candPosts={candPosts} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex}
                                      onPageChange={handlePageChange}/>
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}