import '../css/global.css'

import { Card } from "antd"
import {Link} from "react-router-dom";

const { Meta } = Card;

// 公司卡片
export default function CompanyCard({ company }) {
    return <Link to={`/candidate_view/Company/${company.companyId}`}>
        <Card hoverable bordered={false} className="company-card">
            <Meta title={company.companyName} description={`${company.companyScale} | ${company.financingStage} | ${company.companyType}`} />
        </Card>
    </Link>
}