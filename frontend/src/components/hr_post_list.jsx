import { List, Pagination, Space } from "antd"
import PostCard from "./post_card";
import HRPostCard from "./hr_post_card";

export default function HRPostList({ posts, pageSize, current, total, onPageChange }) {
    return <Space direction="vertical" style={{ width: "100%" }}>
        <List
            grid={{
                gutter: 16, column: 1
            }}
            dataSource={posts.slice((current-1) * pageSize, current * pageSize).map(p => ({
                ...p,
                key: p.postId
            }))}
            renderItem={(post, _) => (
                <List.Item>
                    <HRPostCard post={post} />
                </List.Item>
            )}
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination current={current} pageSize={pageSize}
                        onChange={onPageChange} total={total} hideOnSinglePage={true}/>
        </div>
    </Space>
}