import '../css/global.css'

import { Card } from "antd";

import { PrivateLayout } from "../components/layout";
import CandidateHeader from "../components/candidate_header";
import CandidateChangePasswordForm from "../components/candidateChangePassword_form";


export default function CandidateChangePasswordPage() {
    return PrivateLayout("candidate", {
            header: (
                <CandidateHeader />
            )
        }, {
            children: (
                <div className="flex">
                    <Card className="card-container">
                        <CandidateChangePasswordForm/>
                    </Card>
                </div>
            )
        }
    );
}