import { List, Pagination, Space } from "antd"
import PostCard from "./post_card";

// 搜索页面的岗位列表
export default function PostList({ posts, pageSize, current, total, column = 5, onPageChange, user="candidate" }) {
    return <Space direction="vertical" style={{ width: "100%" }}>
        <List
            grid={{
                gutter: 16, column: column
            }}
            dataSource={posts.slice((current-1) * pageSize, current * pageSize).map(p => ({
                ...p,
                key: p.postId
            }))}
            renderItem={(post, _) => (
                <List.Item>
                    <PostCard post={post} user={{user}} />
                </List.Item>
            )}
        />
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <Pagination current={current} pageSize={pageSize}
                        onChange={onPageChange} total={total} hideOnSinglePage={true}/>
        </div>
    </Space>
}
