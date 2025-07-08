import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { VerifyOtp } from "./components/auth/VerifyOtp";
import { ResetPassword } from "./components/auth/ResetPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Logout } from "./components/auth/logout";
import  Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/Resources";
import ViewCampaign from "./pages/ViewCampaigs";
import EditCampaign from "./pages/EditCampaign";
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ApprovalsPage from "./pages/admin/ApprovalsPage";
import BlogsPage from "./pages/admin/BlogsPage";
import CampaignsPage from "./pages/admin/CampaignsPage";
import ViewBlog from "./pages/ViewBlogs";
import EditBlog from "./pages/EditBlogs";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route
          path="/campaigns/create"
          element={
            <ProtectedRoute>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />
        <Route
          path="/campaigns/:id/edit"
          element={
            <ProtectedRoute>
              <EditCampaign />
            </ProtectedRoute>
          }
        />
        <Route path="/blog" element={<Blogs />} />
        <Route
          path="/blog/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id/edit"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/campaigns/:id" element={<ViewCampaign />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* Admin sub-pages */}
       <Route
         path="/admin/users"
         element={
           <ProtectedRoute>
             <UsersPage />
           </ProtectedRoute>
         }
       />
       <Route
         path="/admin/approvals"
         element={
           <ProtectedRoute>
             <ApprovalsPage />
           </ProtectedRoute>
         }
       />
       <Route
         path="/admin/blogs"
         element={
           <ProtectedRoute>
             <BlogsPage />
           </ProtectedRoute>
         }
       />
       <Route
         path="/admin/campaigns"
         element={
           <ProtectedRoute>
             <CampaignsPage />
           </ProtectedRoute>
         }
       />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/details"
          element={
            <ProtectedRoute>
              <UserDetails />
            </ProtectedRoute>
          }
        />
        
      </Routes>
      
    </>
  );
};

export default App;
