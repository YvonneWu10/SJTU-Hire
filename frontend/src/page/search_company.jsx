import '../css/global.css'

import type {SelectProps, MenuProps} from 'antd';
import {Avatar, Button, Card, Input, Menu, Select, Space} from "antd";
import {useEffect, useState} from "react";

import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {PrivateLayout} from "../components/layout";
import {UserOutlined} from "@ant-design/icons";
import { searchCandidateUsername } from "../service/candidate";
import CompanyList from "../components/company_list";
import {searchCompany} from "../service/company";
import CandidateHeader from "../components/candidate_header";


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


export default function SearchCompanyPage() {
    const [company, setCompany] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 25;
    const companyName = searchParams.get("companyName") || "";

    const getCompany = async () => {
        let resCompany = await searchCompany(pageIndex, pageSize, companyName);
        let companies = resCompany.items;
        let totalPage = resCompany.total;
        setCompany(companies);
        setTotalPage(totalPage);
    };

    // 用来调试，监听searchParams
    useEffect(() => {
        console.log("Updated search parameters:", searchParams.toString());
    }, [searchParams]);

    useEffect(() => {
        getCompany();
    }, [pageIndex, pageSize, companyName]);

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    const handleSearch = (companyName) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", 1);
        currentParams.set("pageSize", 25);
        currentParams.set("companyName", companyName);
        setSearchParams(currentParams);
    };

    return PrivateLayout("candidate", {
        header: (
            <CandidateHeader initialMenu={'companySearch'} />
        )
        }, {
            children: (
                <div className="center-container">
                    <Card className="card-container">
                        <Space direction="vertical" size="large" style={{width: "100%"}}>
                            <div className="input-select-container">
                                <Search allowClear placeholder="输入公司名" onSearch={handleSearch} enterButton size="middle"
                                        style={{width: '20%'}} />
                            </div>
                            <CompanyList company={company} pageSize={pageSize} total={totalPage * pageSize} current={pageIndex}
                                      onPageChange={handlePageChange}/>
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}