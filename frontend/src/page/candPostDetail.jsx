import '../css/global.css'

import {Card, Menu, Space} from "antd";
import { useEffect, useState } from "react";
import { getCandPostById } from "../service/candPost";

import { useParams } from "react-router-dom";
import {BasicLayout, PrivateLayout} from "../components/layout";
import CandPostDetails from "../components/candPost_detail";
import type {MenuProps} from "antd";

const menuItems: MenuProps['items'] = [
    {
        label: '首页',
        key: 'homepage',
    },
    {
        label: '职位管理',
        key: 'postManagement',
    },
    {
        label: '找人',
        key: 'hire',
    },
];

const rightMenuItems: MenuProps['items'] = [
    {
        label: '个人中心',
        key: 'center'
    }
];

export default function CandPostDetailPage() {
    const [post, setPost] = useState(null);
    const [cand, setCand] = useState(null);
    const [candPost, setCandPost] = useState(null);
    const [current, setCurrent] = useState('homepage');

    let { postId } = useParams();
    let { candId } = useParams();
    console.log(postId);

    const getCandPost = async () => {
        let resCandPost = await getCandPostById(candId, postId);
        console.log(resCandPost);
        setPost(resCandPost['postInfo']);
        setCand(resCandPost['candInfo']);
        setCandPost(resCandPost['candPost']);
    }

    useEffect(() => {
        getCandPost();
    }, []);

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return PrivateLayout("HR", {}, {
        children: (
            <div className="center-container">
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" style={{position: 'absolute', top: 15, left: 10}}
                      items={menuItems}/>
                <Menu selectable={false} mode='horizontal' style={{position: 'absolute', top: 15, right: 10}}
                      items={rightMenuItems}/>
                <Card className="card-container">
                    <Space direction="vertical" style={{width: "100%"}}>
                        {cand && candPost && post && <CandPostDetails cand={cand} post={post} candPost={candPost}/>}
                    </Space>
                </Card>
            </div>
        )
    }
    );
}