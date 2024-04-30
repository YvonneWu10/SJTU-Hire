import { List, Pagination, Space } from "antd"
import HRCandCard from "./hr_cand_card";

export default function HRCandList({ candidates, pageSize, current, total, onPageChange }) {
    return <Space direction="vertical" style={{ width: "100%" }}>
        <List
            grid={{
                gutter: 10, column: 1
            }}
            dataSource={candidates.slice((current-1) * pageSize, current * pageSize)}
            renderItem={(cand, _) => (
                <List.Item>
                    <HRCandCard cand={cand} />
                </List.Item>
            )}
        />
        <Pagination current={current} pageSize={pageSize}
                    onChange={onPageChange} total={total} hideOnSinglePage={true}/>
    </Space>
}