import '../css/global.css'
import { UserContext } from "../utils/context";

import type {MenuProps, SelectProps} from 'antd';
import {Avatar, Button, Card, Input, Menu, Select, Space} from "antd";
import {useContext, useEffect, useState} from "react";
import {retPostCities, searchPosts} from "../service/post";

import {useSearchParams} from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import PostList from "../components/post_list";
import {UserOutlined} from "@ant-design/icons";
import {Text} from "recharts";
import {getUsernameById} from "../service/candidate";
import {getAllCandidatesAvailable} from "../service/hr_candidate_view";
import {Header} from "antd/es/layout/layout";
import HRCandList from "../components/hr_cand_list";
import HRMenu from "../components/hr_menu";
import {retOpenPosts, retResponsiblePosts} from "../service/candPost";

const { Search } = Input;

// 用于组织所有的可以被邀请的招聘者的界面
export default function SearchAvailableCandidatesPage() {
    const [candidates, setCandidates] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [postNames, setPostNames] = useState([]);

    // const candId = useContext(UserContext);
    // console.log("context candId:", candId);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 25;
    const candDegree = searchParams.get("candDegree") || "";
    const candWorkYear =  searchParams.get("candWorkYear") != null ? Number.parseInt(searchParams.get("candWorkYear")) : 0;


    const getCandidates = async () => {
        console.log(candWorkYear);
        let resCandidates = await getAllCandidatesAvailable(pageIndex, pageSize, candDegree, candWorkYear);
        let res = resCandidates.items;
        let totalPage = resCandidates.total;
        setCandidates(res);
        setTotalPage(totalPage);
    };

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getCandidates();
    }, [pageIndex, pageSize, candDegree, candWorkYear]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const candDegrees = ["大专", "本科", "硕士", "博士"];
    const candDegreeOption: SelectProps["options"] = candDegrees.map(candDegree => ({
        label: candDegree,
        value: candDegree
    }));


    const handleCandDegree = (candDegree: string) => {
        if (candDegree === undefined) {
            candDegree = "";
        }
        // console.log(workStyle)
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("candDegree", candDegree);
        setSearchParams(currentParams);
    };

    const handleWorkYearSearch = (workYear) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("candWorkYear", workYear);
        setSearchParams(currentParams);
    };

    useEffect(() => {
        getResponsiblePostName();
    }, []);

    const getResponsiblePostName = async () => {
        let res = await retOpenPosts();
        setPostNames(res);
    };

    return PrivateLayout("HR", {
            header:(
                <div>
                    <HRMenu></HRMenu>
                </div>
            )
            }, {
            children: (
                <div>
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <div className="input-select-container">
                                <Search allowClear placeholder="输入最低工作经验要求（年）" onSearch={handleWorkYearSearch} enterButton size="middle"
                                        style={{width: '30%'}} />
                                <Select allowClear style={{width: '30%'}} placeholder="请选择应聘者学历要求"
                                        onChange={handleCandDegree}
                                        options={candDegreeOption}/>
                            </div>
                            <HRCandList candidates={candidates} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex} postNames={postNames}
                                      onPageChange={handlePageChange}/>
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}