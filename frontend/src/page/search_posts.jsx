import '../css/global.css'
import { UserContext } from "../utils/context";

import type {SelectProps} from 'antd';
import {Avatar, Button, Card, Input, Select, Space} from "antd";
import {useContext, useEffect, useState} from "react";
import {retPostCities, searchPosts} from "../service/post";

import {useSearchParams} from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import PostList from "../components/post_list";
import {UserOutlined} from "@ant-design/icons";
import {Text} from "recharts";
import {getUsernameById} from "../service/candidate";

const { Search } = Input;

export default function SearchPostsPage() {
    const [posts, setPosts] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [cities, setCities] = useState([]);
    const [user, setUser] = useState("");

    // const candId = useContext(UserContext);
    // console.log("context candId:", candId);

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
        let resUser = await getUsernameById();
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

    return PrivateLayout("candidate", {
            header: (
                <div style={{ marginLeft: '80%', marginTop: "10px"}} >
                    <Space direction={"horizontal"} size={"middle"}>
                        <div className="avatar-with-subtitle" style={{ marginBottom: "-40px"}}>
                            <Avatar size="large" icon={<UserOutlined/>}/>
                            { user && <span className="avatar-subtitle">您好，{user}</span> }
                        </div>
                            <Button className={"ant-button-primary"} >个人中心</Button>
                    </Space>
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