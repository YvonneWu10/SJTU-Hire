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

export default function HRCandDetailPage() {
    const [cand, setCand] = useState(null);

    let { candId } = useParams();

    const getCand = async () => {
        let cand = await getCandInfoByCandId(candId);
        setCand(cand);
    }

    useEffect(() => {
        getCand();
    }, []);


    return PrivateLayout("HR", {
        header: (
            <HRMenu></HRMenu>
        )
        }, {
            children: (
                <div>
                    <Card className="card-container">
                        <Space direction="vertical" style={{width: "100%"}}>
                            {cand  && <HRCandDetail cand={cand} />}
                        </Space>
                    </Card>
                </div>
            )
        }
    );
}