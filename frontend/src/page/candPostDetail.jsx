import '../css/global.css'
import {Button, Card, Menu, message, Space} from "antd";
import React, { useEffect, useState } from "react";
import {
    forwardSubmissionStageByCandPostId,
    getCandPostById,
    terminateSubmissionStageByCandPostId
} from "../service/candPost";

import { useParams } from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import CandPostDetails from "../components/candPost_detail";
import type {MenuProps} from "antd";
import HRMenu from "../components/hr_menu";

// 用于展示具体的CandPost信息，同时包含两个用于流程变化的按钮

export default function CandPostDetailPage() {
    const [post, setPost] = useState(null);
    const [cand, setCand] = useState(null);
    const [candPost, setCandPost] = useState(null);
    const [projectList, setProjectList] = useState([]);

    let { postId } = useParams();
    let { candId } = useParams();
    const getCandPost = async () => {
        let resCandPost = await getCandPostById(candId, postId);
        console.log(resCandPost);
        setPost(resCandPost['postInfo']);
        setCand(resCandPost['candInfo']);
        setCandPost(resCandPost['candPost']);
        setProjectList(resCandPost['projectInfo']);
    }

    useEffect(() => {
        getCandPost();
    }, []);

    const forwardStage = async() => {
        await forwardSubmissionStageByCandPostId(candId, postId);
        getCandPost();
        message.info("已推进流程");
    }

    const terminateStage = async() => {
        await terminateSubmissionStageByCandPostId(candId, postId);
        getCandPost();
        message.info("已终止流程");
    }

    const isDisabled = (submissionStage) => {
        if (submissionStage === "录取"){
            return true;
        } else if (submissionStage === "流程终止"){
            return true;
        }
        return false;
    }

    return PrivateLayout("HR", {
            header: (
                <HRMenu></HRMenu>
            )
        }, {
            children: (
                <div>
                    <Card className="card-container">
                        {cand && candPost && post && <Space direction="vertical" style={{width: "100%"}}>
                            {cand && candPost && post && <CandPostDetails candidate={cand} post={post} candPost={candPost} projectList={projectList}/>}
                            <div style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                                <Button disabled={isDisabled(candPost.submissionStage)} type="primary" onClick={forwardStage} style={{ right: 0 , marginBottom: 10}}>进入下一环节</Button>
                                <Button disabled={isDisabled(candPost.submissionStage)} type="primary" onClick={terminateStage} style={{ right: 0,  marginLeft: 20, marginBottom: 10}}>淘汰</Button>
                            </div>
                        </Space>}
                    </Card>
                </div>
            )
        }
    );
}