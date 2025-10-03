import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/authService";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        setIsValid(false);
        return;
      }

      try {
        const res = await api.get("/auth/verify-token", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIsValid(res.data.valid);
      } catch (err) {
        setIsValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/login" replace />;

  return children;
}
