import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import API from "../../utils/axios";
import { Mail, Lock } from "lucide-react";

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
        {/* Left: Form */}
        <div className="flex flex-col justify-center px-6 sm:px-20 md:px-40 py-12">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6 text-center">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md mx-auto">
            <div>
              <label className="text-emerald-800 text-sm font-medium mb-1 block">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-emerald-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>
            <div>
              <label className="text-emerald-800 text-sm font-medium mb-1 block">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-emerald-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
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

        {/* Right: Image */}
        <div className="hidden md:flex items-center justify-center bg-emerald-50">
          <div className="p-6 rounded-lg shadow-md bg-white">
            <img
              src="/images/login-illustration.png"
              alt="Cybersecurity login visual"
              className="w-[520px] h-[520px] object-contain rounded-lg"
            />
          </div>
        </div>

      </div>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </>
  );
};
