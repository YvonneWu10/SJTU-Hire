import '../css/global.css'

import { Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getPostById } from "../service/post";

import { useParams } from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import PostDetails from "../components/post_details";
import {getHRInfo} from "../service/hr_user";
import HRMenu from "../components/hr_menu";
import CandPostList from "../components/cand_post_list";
import HRPostDetails from "../components/hr_user_info";
import HRUserDetails from "../components/hr_user_info";
import HRCandDetail from "../components/hr_cand_detail";


export default function HRUserPage() {
    const [hr, setHR] = useState(null);
    const [company, setCompany] = useState(null);
    const [department, setDepartment] = useState(null);

    const getHRUser = async () => {
        let res = await getHRInfo();
        let hr = res["HRInfo"];
        let company = res["companyInfo"];
        let department = res["departmentInfo"]
        console.log(hr)
        setHR(hr);
        setCompany(company);
        setDepartment(department);
    }

    useEffect(() => {
        getHRUser();
    }, []);

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
                        <Space direction="vertical" style={{width: "100%"}}>
                            {hr && company && department && <HRUserDetails hr={hr} company={company} department={department}/>}
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}