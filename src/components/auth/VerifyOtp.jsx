import { useState, useEffect, useRef } from "react";
import { AuthLayout } from "./AuthLayout";
import API from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [user, setUser] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/user/data", { withCredentials: true });
        setUser(res.data.user);

        if (!res.data.user?.hasOtp) {
          await API.post("/auth/send-verify-otp");
        }
      } catch (error) {
        toast.warning("Please login to access this page.");
        navigate("/login");
      }
    };

    fetchData();
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
      await API.post("/auth/verify-otp", {
        userId: user._id,
        otp: otp.join(""),
      });
      toast.success("Your account has been verified!");
      setTimeout(()=> {
        navigate('/dashboard');
        }, 2000)
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <AuthLayout title="Verify OTP">
      <form
        className="space-y-6 mt-4"
        onSubmit={handleSubmit}
        onPaste={handlePaste}
      >
        {user?.email && (
          <p className="text-center text-sm text-emerald-700">
            OTP has been sent to <strong>{user.email}</strong>
          </p>
        )}
        <div className="flex justify-center space-x-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-xl border border-emerald-400 text-center rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-semibold"
        >
          Verify
        </button>
      </form>
      <ToastContainer position="bottom-right" theme="light" />
    </AuthLayout>
  );
};
