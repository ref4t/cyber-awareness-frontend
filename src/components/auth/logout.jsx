// Logout.jsx
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
        toast.success("Logged out successfully");
      } catch (err) {
        console.error(err);
        toast.error("Logout failed");
      } finally {
        navigate("/login");
      }
    };

    doLogout();
  }, [navigate]);

  return null;
};