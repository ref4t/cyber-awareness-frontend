import { useEffect, useState } from "react";
import API from "../utils/axios";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, adminOnly = false }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/verify", { withCredentials: true })
      .then((res) => {
        setIsAuth(true);
        setUser(res.data.user); // assuming the response includes user info
      })
      .catch(() => {
        setIsAuth(false);
        setUser(null);
      });
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;
  if (adminOnly && user?.role !== "admin") return <Navigate to="/dashboard" />;

  return children;
};
