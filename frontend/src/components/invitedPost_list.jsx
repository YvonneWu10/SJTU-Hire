import { List, Pagination, Space } from "antd"
import InvitedPostCard from "./invitedPost_card";


export default function InvitedPostList({ posts, companies, candPosts, timeout, pageSize, current, total, onPageChange }) {
    const combinedData = candPosts.map((candPost, index) => ({
        post: posts[index],
        companyName: companies[index],
        candPost: candPost,
        timeout: timeout[index]
    }));

    return <Space direction="vertical" style={{position: 'absolute', left: '15%', width: "70%"}}>
        <div style={{ marginTop: 30 }}>
            <List
                grid={{
                    gutter: 16, column: 2
                }}
                dataSource={combinedData.slice((current - 1) * pageSize, current * pageSize)}
                renderItem={(data, _) => (
                    <List.Item>
                        <div style={{display: "flex", justifyContent: "center", width: '100%', padding: 5}}>
                            <InvitedPostCard post={data["post"]} companyName={data["companyName"]}
                                             candPost={data["candPost"]} timeout={data["timeout"]} />
                        </div>
                    </List.Item>
                )}
            />
        </div>
        <div style={{display: "flex", justifyContent: "center", padding: 30 }}>
            <Pagination current={current} pageSize={pageSize}
                        onChange={onPageChange} total={total} hideOnSinglePage={true}/>
        </div>
    </Space>
}