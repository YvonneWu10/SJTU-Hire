import '../css/global.css'

import type {SelectProps, MenuProps} from 'antd';
import {Avatar, Button, Card, Input, Menu, Select, Space} from "antd";
import {useEffect, useState} from "react";
import {retPostCities, searchPosts} from "../service/post";

import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import PostList from "../components/post_list";
import {UserOutlined} from "@ant-design/icons";
import { searchCandidateUsername } from "../service/candidate";

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


export default function SearchPostsPage() {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [cities, setCities] = useState([]);
    const [user, setUser] = useState("");
    const [curMenu, setCurMenu] = useState('postSearch');
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 25;
    const postName = searchParams.get("postName") || "";
    const city = searchParams.get("city") || "";
    const workType = searchParams.get("workType") || "";
    const workStyle = searchParams.get("workStyle") || "";

    const getPosts = async () => {
        let resPosts = await searchPosts(pageIndex, pageSize, postName, city, workType, workStyle);
        let posts = resPosts.items;
        let totalPage = resPosts.total;
        setPosts(posts);
        setTotalPage(totalPage);
    };

    const getPostCities = async () => {
        let resCities = await retPostCities();
        setCities(resCities);
    };

    const getUserName = async () => {
        console.log(`Entering getUserName`);
        let resUser = await searchCandidateUsername();
        setUser(resUser);
    };

    useEffect(() => {
        getPostCities();
        getUserName();
    }, []);

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getPosts();
    }, [pageIndex, pageSize, postName, city, workType, workStyle]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const handleSearch = (postName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("postName", postName);
        setSearchParams(currentParams);
    };

    // const cities = ["北京", "成都", "重庆", "大连", "福州", "广州", "哈尔滨", "海口", "杭州", "齐齐哈尔", "上海", "深圳", "台北", "武汉"];
    const cityOptions: SelectProps['options'] = cities.map(city => ({
        label: city,
        value: city
    }));
    const workTypes = ["实习", "正式"];
    const workTypeOptions: SelectProps["options"] = workTypes.map(workType => ({
        label: workType,
        value: workType
    }));
    const workStyles = ["线下", "远程"];
    const workStyleOptions: SelectProps["options"] = workStyles.map(workStyle => ({
        label: workStyle,
        value: workStyle
    }));

    const handleCityOption = (city: string) => {
        if (city === undefined) {
            city = "";
        }
        // console.log(city)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("city", city);
        setSearchParams(currentParams);
    };

    const handleWorkTypeOption = (workType: string) => {
        if (workType === undefined) {
            workType = "";
        }
        // console.log(workType)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("workType", workType);
        setSearchParams(currentParams);
    };

    const handleWorkStyleOption = (workStyle: string) => {
        if (workStyle === undefined) {
            workStyle = "";
        }
        // console.log(workStyle)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("workStyle", workStyle);
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
                            <div className="input-select-container">
                                <Search allowClear placeholder="输入岗位名" onSearch={handleSearch} enterButton size="middle"
                                        style={{width: '20%'}} />
                                <Select allowClear style={{width: '20%'}} placeholder="请选择城市" onChange={handleCityOption}
                                        options={cityOptions}/>
                                <Select allowClear style={{width: '20%'}} placeholder="请选择实习/正式"
                                        onChange={handleWorkTypeOption}
                                        options={workTypeOptions}/>
                                <Select allowClear style={{width: '20%'}} placeholder="请选择线下/远程"
                                        onChange={handleWorkStyleOption}
                                        options={workStyleOptions}/>
                            </div>
                            <PostList posts={posts} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex}
                                      onPageChange={handlePageChange}/>
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}