import '../css/global.css'

import { Card } from "antd"
import {Link} from "react-router-dom";

const { Meta } = Card;
// 用于展示岗位信息和跳转至详情界面
export default function HRPostCard({ post }) {
    // console.log(post.postId);
    return <Link to={`/hr_view/managePosts/postDetail/${post.postId}`}>
        <Card hoverable bordered={false} className="post-card">
            <Meta title={post.postName} description={`${post.city} ${post.workType} ${post.workStyle}`} />
        </Card>
    </Link>
}