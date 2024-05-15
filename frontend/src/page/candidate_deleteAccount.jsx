import '../css/global.css'

import { Card } from "antd";

import { PrivateLayout } from "../components/layout";
import CandidateHeader from "../components/candidate_header";
import CandidateDeleteAccountForm from "../components/candidateDeleteAccount_form";


export default function CandidateDeleteAccountPage() {
    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader />
            )
        }, {
            children: (
                <div className="flex">
                    <Card className="card-container">
                        <CandidateDeleteAccountForm/>
                    </Card>
                </div>
            )
        }
    );
}