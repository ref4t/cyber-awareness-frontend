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
import {Dashboard} from "./pages/Dashboard";
import Blogs from "./pages/Blogs";






const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/blog" element={<Blogs />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/logout" element={<Logout/>} />
    <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
