import React from "react";
import api from "../utils/axios";
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = React.useState(false);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  // Fix: verifyOtp should accept email and otp
  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await api.post("/auth/verify-otp", { email, otp });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("OTP verification failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, verifyOtp, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
