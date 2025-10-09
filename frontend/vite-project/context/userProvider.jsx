import React, { useState, useEffect } from "react";
import UserContext from "./userContext";
import api from "../src/services/authService";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await api.get("/auth/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser: getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
