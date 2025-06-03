import { useState } from "react";
import axios from "axios";
import { AuthLayout } from "./AuthLayout";
import { Navbar } from "../Navbar";
import { Link } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        name,
        email,
        password,
        isBusiness,
      });
      toast.success("Account created! Please verify your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (

    <AuthLayout title="Create an Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your Name" className="w-full px-4 py-2 border rounded" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-2 border rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="********" className="w-full px-4 py-2 border rounded" />
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={isBusiness}
            onChange={(e) => setIsBusiness(e.target.checked)}
            className="h-4 w-4"
          />
          <span>Register as a business</span>
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
      </form>
      <div className="text-sm text-center mt-4 space-y-2">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </AuthLayout>

  );
};
