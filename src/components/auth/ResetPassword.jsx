import { useState } from "react";
import axios from "axios";
import { AuthLayout } from "./AuthLayout";
import { Navbar } from "../Navbar";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:3000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });
      setMessage("Password reset successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    
    <AuthLayout title="Reset Password">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-2 border rounded" />
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter OTP" className="w-full px-4 py-2 border rounded" />
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required placeholder="New Password" className="w-full px-4 py-2 border rounded" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Reset Password</button>
      </form>
    </AuthLayout>
  );
};
