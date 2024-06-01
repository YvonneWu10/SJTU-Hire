import { List, Pagination, Space } from "antd"
import DeliveredPostCard from "./deliveredPost_card";
import EndedPostCard from "./endedPost_card";
import AdmittedPostCard from "./admittedPost_card";

const CardComponentMap = {
    'DeliveredPostCard': DeliveredPostCard,
    'EndedPostCard': EndedPostCard,
    'AdmittedPostCard': AdmittedPostCard
};

// 已投递/已结束流程/已录取的职位列表
export default function DeliveredEndedAdmittedPostList({ posts, companies, candPosts, pageSize, current, total,
                                                        onPageChange, cardType }) {
    const combinedData = candPosts.map((candPost, index) => ({
        post: posts[index],
        companyName: companies[index],
        candPost: candPost
    }));

    const CardToRender = CardComponentMap[cardType];

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
                        <CardToRender post={data["post"]} companyName={data["companyName"]}
                                      candPost={data["candPost"]} />
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