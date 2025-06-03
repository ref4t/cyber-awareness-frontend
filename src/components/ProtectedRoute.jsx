import { useEffect, useState } from "react";
import API from "../utils/axios";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    API.get("/auth/verify")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;
  return children;
};
