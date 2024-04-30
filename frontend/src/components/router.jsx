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

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/candidate_view" element={<SearchPostsPage />} />
            <Route path="/candidate_view/Post/:postId" element={<PostPage />} />
            <Route path="/hr_view" element={<CandPostPage />} />
            <Route path="/hr_view/candPostDetail/:candId/:postId" element={<CandPostDetailPage />} />
            <Route path="/administer_view" element={<AdminPage />} />
            <Route path="/job-management" element={<JobManagement />} />
            <Route path="/company-management" element={<CompanyManagement />} />
            <Route path="/resume-management" element={<ResumeManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/hr_view/findCandidates" element={<SearchAvailableCandidatesPage />} />
            <Route path="/hr_view/findCandidates/candDetail/:candId" element={<HRCandDetailPage />} />
            <Route path="/hr_view/managePosts" element={<HRPostPage />} />
            <Route path="/hr_view/managePosts/postDetail/:postId" element={<HRPostDetailPage />} />
            <Route path="/hr_view/user" element={<HRUserPage />} />
        </Routes>
    </BrowserRouter>
}