import '../css/global.css'

import { Card } from "antd"
import {Link} from "react-router-dom";

const { Meta } = Card;

export default function PostCard({ post }) {
    // console.log(post.postId);
    return <Link to={`/candidate_view/Post/${post.postId}`}>
        <Card hoverable bordered={false} className="post-card">
            <Meta title={post.postName} description={`${post.city} | ${post.workType} | ${post.workStyle}`} />
        </Card>
    </Link>
}