import { List, Pagination, Space } from "antd"
import HRCandCard from "./hr_cand_card";

// 用于组织招聘者信息
export default function HRCandList({ candidates, postNames, pageSize, current, total, onPageChange }) {
    // console.log(postNames);
    return <Space direction="vertical" style={{ width: "100%" }}>
        <List
            grid={{
                gutter: 10, column: 1
            }}
            dataSource={candidates.slice((current-1) * pageSize, current * pageSize)}
            renderItem={(cand, _) => (
                <List.Item>
                    <HRCandCard cand={cand} postNames={postNames} />
                </List.Item>
            )}
        />
        <Pagination current={current} pageSize={pageSize}
                    onChange={onPageChange} total={total} hideOnSinglePage={true}/>
    </Space>
}