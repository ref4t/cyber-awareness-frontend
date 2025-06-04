import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessDetails, setBusinessDetails] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    toast.error("Please fill in all required fields.");
    return;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  if (isBusiness) {
    if (!businessName || !businessAddress || !businessDetails) {
      toast.error("Please complete all business fields.");
      return;
    }
  }

  try {
    await axios.post("http://localhost:3000/api/auth/register", {
      name,
      email,
      password,
      isBusiness,
      businessName: isBusiness ? businessName : undefined,
      businessAddress: isBusiness ? businessAddress : undefined,
      businessDetails: isBusiness ? businessDetails : undefined,
    });

    toast.success("Account created! Please verify your email.");
  } catch (err) {
    toast.error(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
        {/* Left: Form */}
        <div className="flex flex-col justify-center px-8 md:px-80 py-12">
          <h2 className="text-3xl font-bold text-emerald-600 mb-6">Create Your Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <label className="flex items-center text-sm text-emerald-700">
              <input
                type="checkbox"
                checked={isBusiness}
                onChange={(e) => setIsBusiness(e.target.checked)}
                className="mr-2 h-4 w-4 text-emerald-600 border-emerald-300 rounded"
              />
              Register as a business
            </label>

            {isBusiness && (
              <>
                <input
                  type="text"
                  placeholder="Business Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <input
                  type="text"
                  placeholder="Business Address"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <textarea
                  placeholder="Business Details"
                  value={businessDetails}
                  onChange={(e) => setBusinessDetails(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg text-[15px] font-semibold shadow-sm"
            >
              Sign Up
            </button>
          </form>
          <div className="text-sm text-center mt-6 space-y-2 text-emerald-700">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex items-center justify-center bg-emerald-50">
          <img
            src="/images/signup-illustration.png"
            alt="Cybersecurity signup visual"
            className="w-3/4 max-h-[80%] object-contain"
          />
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="light" />
      <Footer />
    </>
  );
};
