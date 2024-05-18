import '../css/global.css'

import { Button, Card } from "antd"
import { Link } from "react-router-dom";
import { acceptInvitationByPostId, refuseInvitationByPostId } from "../service/candPost";
import { refreshPage } from "../utils/refresh";
import React from "react";

const { Meta } = Card;

export default function InvitedPostCard({ post, companyName, candPost, timeout }) {
    const acceptOnClick = () => {
        acceptInvitationByPostId(post.postId);
        refreshPage();
    }

    const refuseOnClick = () => {
        refuseInvitationByPostId(post.postId);
        refreshPage();
    }

    return <Card hoverable
                 bordered={false}
                 className="delivered-post-card"
                 style={{height: 150, width: 500}}>
        <Link to={`/candidate_view/Post/${post.postId}`}>
            <Meta title={post.postName} description={companyName}/>
        </Link>
        <p style={{marginBottom: -10}}>应聘于 {candPost.submissionDate}</p>
        <p style={{marginBottom: -10}}>目前状态 - {candPost.submissionStage}</p>
        {timeout ? (<div style={{display: "flex", marginTop: -30, marginLeft: 360}}>
                <Button disabled>未开放</Button>
            </div>) :
            (<div style={{display: "flex", marginTop: -30}}>
                <div style={{ marginLeft: 250 }}>
                    <Button onClick={acceptOnClick}>接受邀请</Button>
                </div>
                <div style={{ marginLeft: 10 }}>
                    <Button onClick={refuseOnClick}>拒绝邀请</Button>
                </div>
            </div>)
        }
    </Card>

}