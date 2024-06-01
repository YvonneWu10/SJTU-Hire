import '../css/global.css'

import {Card, Menu, Space} from "antd";
import { useEffect, useState } from "react";
import { getCandPostById } from "../service/candPost";

import { useParams } from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import CandPostDetails from "../components/candPost_detail";
import type {MenuProps} from "antd";
import {getCandInfoByCandId} from "../service/hr_candidate_view";
import HRCandDetail from "../components/hr_cand_detail";
import HRMenu from "../components/hr_menu";
import HRPostDetails from "../components/hr_post_detail";
import {getHRPostById} from "../service/hr_post_view";
import HREditPostDetails from "../components/hr_edit_post_detail";
import HRCreatePostDetails from "../components/hr_create_post";

// 用于组织创建岗位的界面
export default function HRCreatePostPage() {

    return PrivateLayout("HR", {
            header: (
                <HRMenu></HRMenu>
            )
        }, {
            children: (
                <div>
                    <Card className="card-container">
                        <Space direction="vertical" style={{width: "100%"}}>
                            {<HRCreatePostDetails />}
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}