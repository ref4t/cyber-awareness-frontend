import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import API from "../../utils/axios";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/login", { email, password }, { withCredentials: true });
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
        {/* Left: Login Form */}
        <div className="flex flex-col justify-center px-8 md:px-80 py-12">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-emerald-800 text-sm font-medium mb-1 block">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="text-emerald-800 text-sm font-medium mb-1 block">Password</label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div className="flex justify-between items-center text-sm text-emerald-700">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4 text-emerald-600 border-emerald-300 rounded" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-emerald-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-[15px] font-semibold shadow-sm"
            >
              Sign In
            </button>
            <p className="text-sm text-center text-emerald-700">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-emerald-600 font-medium hover:underline">
                Register here
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex items-center justify-center bg-emerald-50">
          <img
            src="/images//login-illustration.png"
            alt="Cybersecurity login visual"
            className="w-3/4 max-h-[80%] object-contain"
          />
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </>
  );
};
