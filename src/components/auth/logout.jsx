// Logout.jsx

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import API from "../../utils/axios";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await API.post("/auth/logout", {}, { withCredentials: true });
        toast.success("Logged out successfully");
      } catch (err) {
        toast.error("Logout failed");
      } finally {
        navigate("/login");
      }
    };

    doLogout();
  }, [navigate]);

  return null;
};