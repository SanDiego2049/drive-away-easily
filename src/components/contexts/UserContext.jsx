// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // holds user: { id, role, ... }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("userRole") || "user";

    if (!token || !storedUser) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const fullUser = {
        ...parsedUser,
        role: parsedUser.role || storedRole || "user",
        hasCompletedKyc:
          parsedUser.hasCompletedKyc !== undefined
            ? parsedUser.hasCompletedKyc
            : false,
      };
      setUser(fullUser);
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = (updates) => {
    setUser((prev) => {
      const updatedUser = { ...prev, ...updates };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const setAuthInfo = (token, userData) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Clear auth info on logout
  const clearAuthInfo = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, loading, setAuthInfo, clearAuthInfo }}
    >
      {children}
    </UserContext.Provider>
  );
};