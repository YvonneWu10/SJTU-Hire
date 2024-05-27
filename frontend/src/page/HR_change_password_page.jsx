import '../css/global.css'

import { Card, Space } from "antd";
import React, { useEffect, useState } from "react";
import {BasicLayout, PrivateLayout} from "../components/layout";
import {getHRInfo} from "../service/hr_user";
import HRMenu from "../components/hr_menu";
import HRChangePasswordForm from "../components/hr_change_password";

// 修改密码的界面
export default function HRChangePasswordPage() {
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
                            {hr && company && department && <HRChangePasswordForm hr={hr} company={company} department={department}/>}
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}