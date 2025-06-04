import { useState } from "react";
import { AuthLayout } from "./AuthLayout";
import API from "../../utils/axios";

export const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  API.post("/send-verify-otp",{
        
      });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await API.post("/auth/verify-otp", {
        email,
        otp,
      });
      setMessage("Your account has been verified.");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <AuthLayout title="Verify OTP">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full px-4 py-2 border rounded" />
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required placeholder="Enter OTP" className="w-full px-4 py-2 border rounded" />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Verify</button>
      </form>
    </AuthLayout>
  );
};
