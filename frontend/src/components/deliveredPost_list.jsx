import { List, Pagination, Space } from "antd"
import CandPostCard from "./cand_post_card";
import DeliveredPostCard from "./deliveredPost_card";

export default function DeliveredPostList({ posts, companies, candPosts, pageSize, current, total, onPageChange }) {
    // console.log(`posts in DeliveredPostList: ${JSON.stringify(posts, null, 2)}`);
    // console.log(`companies in DeliveredPostList: ${companies}`);
    // console.log(`candPosts in DeliveredPostList: ${JSON.stringify(candPosts, null, 2)}`);
    const combinedData = candPosts.map((candPost, index) => ({
        post: posts[index],
        companyName: companies[index],
        candPost: candPost
    }));

    // console.log(`combinedData in DeliveredPostList: ${JSON.stringify(combinedData, null, 2)}`);
    // console.log(`combinedData candPost in DeliveredPostList: ${JSON.stringify(combinedData[0]["candPost"], null, 2)}`);

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
                        <DeliveredPostCard post={data["post"]} companyName={data["companyName"]}
                                           candPost={data["candPost"]}/>
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