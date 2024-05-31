import '../css/global.css'

import { Card, Space } from "antd";
import { useEffect, useState } from "react";
import { getPostById } from "../service/post";

import { useParams } from "react-router-dom";
import { BasicLayout } from "../components/layout";
import PostDetails from "../components/post_details";


export default function PostPage() {
    const [post, setPost] = useState(null);

    let { postId } = useParams();
    console.log(postId);

    const getPost = async () => {
        let resPost = await getPostById(postId);
        setPost(resPost);
    }

    useEffect(() => {
        getPost();
    }, []);

    return <BasicLayout>
        <Card className="card-container">
            <Space direction="vertical" style={{ width: "100%" }}>
                {post && <PostDetails post={ post } />}
            </Space>
        </Card>
    </BasicLayout>
}