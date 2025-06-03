import { useState } from "react";
import axios from "axios";
import { AuthLayout } from "./AuthLayout";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
      setMessage("Reset OTP sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    }
  };

  return (

    <AuthLayout title="Forgot Password">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-2 border rounded" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Send OTP</button>
      </form>
    </AuthLayout>
  );
};
