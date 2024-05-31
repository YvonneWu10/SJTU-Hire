import { List, Pagination, Space } from "antd"
import CandPostCard from "./cand_post_card";

export default function CandPostList({ cands, posts, candPosts, pageSize, current, total, onPageChange }) {
    const combinedData = cands.map((cand, index) => ({
        cand: cand,
        post: posts[index],
        candPost: candPosts[index]
    }));
    console.log(combinedData);
    return <Space direction="vertical" style={{ width: "100%" }}>
        <List
            grid={{
                gutter: 16, column: 1
            }}
            dataSource={combinedData.slice((current-1) * pageSize, current * pageSize)}
            renderItem={(data, _) => (
                <List.Item>
                    <CandPostCard post={data["post"]} cand={data["cand"]} candPost={data["candPost"]} />
                </List.Item>
            )}
        />
        <Pagination current={current} pageSize={pageSize}
                    onChange={onPageChange} total={total} hideOnSinglePage={true}/>
    </Space>
}