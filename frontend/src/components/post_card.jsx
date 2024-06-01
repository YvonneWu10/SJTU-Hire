import '../css/global.css'

import { Card } from "antd"
import {Link} from "react-router-dom";

const { Meta } = Card;

// 岗位搜索页面的岗位卡片
export default function PostCard({ post, user }) {
    // console.log(`user: `, user);
    return (user.user === "candidate") ?
        (<Link to={`/candidate_view/Post/${post.postId}`}>
            <Card hoverable bordered={false} className="post-card">
                <Meta title={post.postName} description={`${post.city} | ${post.workType} | ${post.workStyle}`} />
            </Card>
        </Link>) :
        (<Card hoverable bordered={false} className="post-card">
            <Meta title={post.postName} description={`${post.city} | ${post.workType} | ${post.workStyle}`} />
        </Card>)
}