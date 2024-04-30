import '../css/global.css'

import { Card } from "antd"
import {Link} from "react-router-dom";

const { Meta } = Card;

export default function CompanyCard({ company }) {
    return <Link to={`/candidate_view/Post/${company.companyId}`}>
        <Card hoverable bordered={false} className="company-card">
            <Meta title={company.companyName} />
        </Card>
    </Link>
}