import { useState } from "react";
import API from "../../utils/axios";
import { AuthLayout } from "./AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      toast.success("Reset OTP sent to your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <p className="text-sm text-gray-600 text-center">
          Enter your registered email and we’ll send you an OTP to reset your password.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium shadow-sm"
        >
          Send OTP
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-emerald-700">
        Remembered your password?{" "}
        <Link to="/login" className="text-emerald-600 hover:underline font-medium">
          Back to Login
        </Link>
      </div>

      <ToastContainer position="bottom-right" theme="light" />
    </AuthLayout>
  );
};
