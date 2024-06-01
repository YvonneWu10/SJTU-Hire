import '../css/global.css'

import { Card } from "antd"
import { Link } from "react-router-dom";

const { Meta } = Card;

// 已录取的岗位卡片
export default function AdmittedPostCard({ post, companyName, candPost }) {
    return <Card hoverable
                 bordered={false}
                 className="delivered-post-card"
                 style={{ height: 150, width: 500 }} >
        <Link to={`/candidate_view/Post/${post.postId}`}>
            <Meta title={post.postName} description={companyName}/>
        </Link>
        <p style={{marginBottom: -10}}>应聘于 {candPost.submissionDate}</p>
        <p style={{marginBottom: -10}}>目前状态 - {candPost.submissionStage}</p>
    </Card>
}