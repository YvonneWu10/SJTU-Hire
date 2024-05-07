import '../css/global.css'

import {Button, Card} from "antd"
import {Link} from "react-router-dom";

const { Meta } = Card;

export default function DeliveredPostCard({ post, companyName, candPost }) {
    // console.log(`DeliveredPostCard: ${JSON.stringify(post, null, 2)} ${companyName} ${JSON.stringify(candPost, null, 2)}`);

    const endPorcessOnClick = () => {
    }

    return <Card hoverable
                 bordered={false}
                 className="delivered-post-card"
                 style={{ height: 150, width: 500 }} >
        <Link to={`/candidate_view/Post/${post.postId}`}>
            <Meta title={post.postName} description={companyName}/>
        </Link>
        <p style={{marginBottom: -10}}>应聘于 {candPost.submissionDate}</p>
        <p style={{marginBottom: -10}}>目前状态 - {candPost.submissionStage}</p>
        <div style={{display: "flex", marginLeft: 350, marginTop: -30}}>
            <Button onClick={endPorcessOnClick} >结束流程</Button>
        </div>
    </Card>

}