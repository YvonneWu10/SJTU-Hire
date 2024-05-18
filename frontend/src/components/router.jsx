import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPostsPage from "../page/search_posts";
import CandPostPage from "../page/hrHomepage";
import CandPostDetailPage from "../page/candPostDetail";
import LoginPage from "../page/login";
import PostPage from "../page/post";
import AdminPage from "../page/admin_Admin";
import JobManagement from '../page/admin_JobManagement';
import CompanyManagement from '../page/admin_CompanyManagement';
import ResumeManagement from '../page/admin_ResumeManagement';
import UserManagement from '../page/admin_UserManagement';
import Statistics from '../page/admin_Statistics';
import SearchAvailableCandidatesPage from "../page/hr_find_candidates";
import HRCandDetailPage from "../page/hr_cand_detail";
import HRPostPage from "../page/hr_manage_post";
import HRPostDetailPage from "../page/hr_post_detail";
import HRUserPage from "../page/hr_user";
import HREditPostDetails from "./hr_edit_post_detail";
import HREditPostDetailPage from "../page/hr_edit_post_detail_page";
import HRCreatePostPage from "../page/hr_create_post";
import CandidateEndedPage from "../page/candidate_ended";
import CandidateInvitedPage from "../page/candidate_invited";
import CandidateDeliveredPage from "../page/candidate_delivered";
import CompanyPage from "../page/company";
import SearchCompanyPage from "../page/search_company";
import HREditCompany from "./hr_edit_company";
import HREditCompanyPage from "../page/HR_edit_company_page";
import HRChangePasswordPage from "../page/HR_change_password_page";
import HREditUserInfoPage from "../page/hr_edit_personal_info";
import CandidateRegisterPage from "../page/candidage_register";
import HRRegisterPage from "../page/hr_register";


export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/candidate_view" element={<SearchPostsPage />} />
            <Route path="/candidate_view/Post/:postId" element={<PostPage />} />
            <Route path="/candidate_view/SearchCompany" element={<SearchCompanyPage />} />
            <Route path="/candidate_view/Company/:companyId" element={<CompanyPage />} />
            <Route path="/candidate_view/Delivered" element={<CandidateDeliveredPage />} />
            <Route path="/candidate_view/Invited" element={<CandidateInvitedPage />} />
            <Route path="/candidate_view/Ended" element={<CandidateEndedPage />} />
            <Route path="/candidate_view/Register" element={<CandidateRegisterPage />} />

            <Route path="/administer_view" element={<AdminPage />} />
            <Route path="/job-management" element={<JobManagement />} />
            <Route path="/company-management" element={<CompanyManagement />} />
            <Route path="/resume-management" element={<ResumeManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/statistics" element={<Statistics />} />

            <Route path="/hr_view" element={<CandPostPage />} />
            <Route path="/hr_view/candPostDetail/:candId/:postId" element={<CandPostDetailPage />} />
            <Route path="/hr_view/findCandidates" element={<SearchAvailableCandidatesPage />} />
            <Route path="/hr_view/findCandidates/candDetail/:candId" element={<HRCandDetailPage />} />
            <Route path="/hr_view/managePosts" element={<HRPostPage />} />
            <Route path="/hr_view/managePosts/postDetail/:postId" element={<HRPostDetailPage />} />
            <Route path="/hr_view/user" element={<HRUserPage />} />
            <Route path="/hr_view/user/personalInfo" element={<HRUserPage />} />
            <Route path="/hr_view/user/editCompany" element={<HREditCompanyPage />} />
            <Route path="/hr_view/user/editPassword" element={<HRChangePasswordPage />} />
            <Route path="/hr_view/user/editPersonalInfo" element={<HREditUserInfoPage />} />
            <Route path="/hr_view/managePosts/editPostDetail/:postId" element={<HREditPostDetailPage />} />
            <Route path="/hr_view/managePosts/createPost" element={<HRCreatePostPage />} />
            <Route path="/hr_view/Register" element={<HRRegisterPage />}/>
        </Routes>
    </BrowserRouter>
}