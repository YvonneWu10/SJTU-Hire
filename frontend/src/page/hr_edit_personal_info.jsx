import '../css/global.css'

import { Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getPostById } from "../service/post";

import { useParams } from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import PostDetails from "../components/post_details";
import {getHRInfo} from "../service/hr_user";
import HRMenu from "../components/hr_menu";
import HREditPersonalInfo from "../components/hr_edit_personal_info";

// 修改个人信息的组织界面
export default function HREditUserInfoPage() {
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
                            {hr && company && department && <HREditPersonalInfo hr={hr} company={company} department={department}/>}
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}