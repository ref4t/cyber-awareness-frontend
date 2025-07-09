import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// General Components
import ScrollToTop from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Lazy-loaded Admin Pages (performance)
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UsersPage = lazy(() => import("./pages/admin/UsersPage"));
const ApprovalsPage = lazy(() => import("./pages/admin/ApprovalsPage"));
const BlogsPage = lazy(() => import("./pages/admin/BlogsPage"));
const CampaignsPage = lazy(() => import("./pages/admin/CampaignsPage"));
const AdminResourceUpload = lazy(() => import("./pages/AdminResources"));

// Public Pages
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Terms from "./pages/Terms";
import Resources from "./pages/Resources";

// Auth Pages
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { ForgotPassword } from "./components/auth/ForgotPassword";
import { VerifyOtp } from "./components/auth/VerifyOtp";
import { ResetPassword } from "./components/auth/ResetPassword";
import { Logout } from "./components/auth/logout";

// User Pages
import Dashboard from "./pages/Dashboard";
import UserDetails from "./pages/UserDetails";

// Blog Pages
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import ViewBlog from "./pages/ViewBlogs";
import EditBlog from "./pages/EditBlogs";

// Campaign Pages
import Campaigns from "./pages/Campaigns";
import CreateCampaign from "./pages/CreateCampaign";
import ViewCampaign from "./pages/ViewCampaigs";
import EditCampaign from "./pages/EditCampaign";

// 404 Not Found
const NotFound = () => (
  <div className="h-screen flex items-center justify-center text-2xl font-bold text-emerald-700">
    404 - Page Not Found
  </div>
);

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/resources" element={<Resources />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />

          {/* User Routes */}
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

          {/* Blog Routes */}
          <Route path="/blog" element={<Blogs />} />
          <Route path="/blog/:id" element={<ViewBlog />} />
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

          {/* Campaign Routes */}
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<ViewCampaign />} />
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

          {/* Admin Routes (adminOnly = true) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute adminOnly>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/approvals"
            element={
              <ProtectedRoute adminOnly>
                <ApprovalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute adminOnly>
                <BlogsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/campaigns"
            element={
              <ProtectedRoute adminOnly>
                <CampaignsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/resources"
            element={
              <ProtectedRoute adminOnly>
                <AdminResourceUpload />
              </ProtectedRoute>
            }
          />

          {/* Catch-All Route (404) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
