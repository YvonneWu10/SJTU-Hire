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
import SearchCompanyPage from "../page/search_company";
import DeliveryPage from "../page/delivery";
import CandPersonalCenterPage from "../page/candPersonalCenter";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/candidate_view/SearchPost" element={<SearchPostsPage />} />
            <Route path="/candidate_view/Post/:postId" element={<PostPage />} />
            <Route path="/candidate_view/SearchCompany" element={<SearchCompanyPage />} />
            <Route path="/candidate_view/Delivery" element={<DeliveryPage />} />
            <Route path="/candidate_view/PersonalCenter" element={<CandPersonalCenterPage />} />
            <Route path="/hr_view" element={<CandPostPage />} />
            <Route path="/hr_view/candPostDetail/:candId/:postId" element={<CandPostDetailPage />} />
            <Route path="/administer_view" element={<AdminPage />} />
            <Route path="/job-management" element={<JobManagement />} />
            <Route path="/company-management" element={<CompanyManagement />} />
            <Route path="/resume-management" element={<ResumeManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/statistics" element={<Statistics />} />
        </Routes>
    </BrowserRouter>
}