import '../css/global.css'

import { Card, Menu, Space } from "antd";
import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";
import { PrivateLayout } from "../components/layout";
import type { MenuProps } from "antd";
import { getCompanyById } from "../service/company";
import CompanyDetails from "../components/company_details";
import PostList from "../components/post_list";
import CandidateHeader from "../components/candidate_header";

// 公司详细情况页面
export default function CompanyPage() {
    const [posts, setPosts] = useState(null);
    const [totalPage, setTotalPage] = useState(0);
    const [company, setCompany] = useState(null);
    const [departments, setDepartments] = useState(null);
    const [curDepartment, setCurDepartment] = useState((0).toString());
    const [departmentItems, setDepartmentItems] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();
    const pageIndex = searchParams.get("pageIndex") != null ? Number.parseInt(searchParams.get("pageIndex")) : 1;
    const pageSize = searchParams.get("pageSize") != null ? Number.parseInt(searchParams.get("pageSize")) : 8;

    let { companyId } = useParams();

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

    const departmentMenuOnClick: MenuProps['onClick'] = (event) => {
        console.log(`departmentMenuOnClick: ${event.key} ${typeof event.key}`);
        setCurDepartment(event.key);
        setDisplayPosts(posts[event.key]);
        setTotalPage(Math.ceil(posts[event.key].length / pageSize));
    };

    const handlePageChange = (page) => {
        const currentParams = new URLSearchParams(searchParams);
        currentParams.set("pageIndex", (page).toString());
        setSearchParams(currentParams);
    };

    return PrivateLayout("candidate", {
        header: (
            <CandidateHeader />
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