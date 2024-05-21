import { List, Pagination, Space } from "antd"
import CompanyCard from "./company_card";

// 公司列表
export default function CompanyList({ company, pageSize, current, total, onPageChange }) {
    return <Space direction="vertical" style={{ width: "100%" }}>
        <List
            grid={{
                gutter: 16, column: 5
            }}
            dataSource={company.slice((current-1) * pageSize, current * pageSize).map(c => ({
                ...c,
                key: c.companyId
            }))}
            renderItem={(company, _) => (
                <List.Item>
                    <CompanyCard company={company} />
                </List.Item>
            )}
        />
        <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
            <Pagination current={current} pageSize={pageSize}
                        onChange={onPageChange} total={total} hideOnSinglePage={true}/>
        </div>
    </Space>
}