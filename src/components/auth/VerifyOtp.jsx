import { useState, useEffect, useRef } from "react";
import { AuthLayout } from "./AuthLayout";
import API from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    API.get("/user/data")
      .then((res) => setEmail(res.data.user.email))
      .catch(() => setEmail(""));
    API.post("/auth/send-verify-otp").catch(() => {});
  }, []);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (!/^[0-9]{6}$/.test(pasteData)) return;
    const pasteOtp = pasteData.split("");
    setOtp(pasteOtp);
    pasteOtp.forEach((digit, idx) => {
      if (inputRefs.current[idx]) {
        inputRefs.current[idx].value = digit;
      }
    });
    if (inputRefs.current[5]) inputRefs.current[5].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/verify-otp", { otp: otp.join("") });
      toast.success("Your account has been verified!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <AuthLayout title="Verify OTP">
      <ToastContainer />
      <form className="space-y-6" onSubmit={handleSubmit} onPaste={handlePaste}>
        {email && (
          <p className="text-center text-sm text-gray-600">OTP sent to {email}</p>
        )}
        <div className="flex justify-center space-x-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-10 h-10 border text-center rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Verify
        </button>
      </form>
    </AuthLayout>
  );
};
