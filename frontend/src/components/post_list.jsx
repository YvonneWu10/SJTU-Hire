import { List, Pagination, Space } from "antd"
import PostCard from "./post_card";

export default function PostList({ posts, pageSize, current, total, onPageChange, columns = 5, gutter = 16 }) {
    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <List
                grid={{
                    gutter: gutter,
                    column: columns
                }}
                dataSource={posts.slice((current-1) * pageSize, current * pageSize).map(p => ({
                    ...p,
                    key: p.postId
                }))}
                renderItem={(post, _) => (
                    <List.Item>
                        <PostCard post={post} />
                    </List.Item>
                )}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Pagination current={current} pageSize={pageSize}
                            onChange={onPageChange} total={total} hideOnSinglePage={true}/>
            </div>
        </Space>
    );
}
