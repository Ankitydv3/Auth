import React from "react";
import api from "../utils/axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading, setLoading] = React.useState(false);

  // LOGIN
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });

      // if backend says OTP verification needed
      if (data.needsVerification) {
        return {
          verify: true,
          email: data.email,
        };
      }

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.log("Login error:", error.response?.data);

      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      return data;
    } catch (error) {
      console.log("Registration error:", error.response?.data);

      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };

  // VERIFY OTP
  const verifyOtp = async (email, otp) => {
    try {
      const { data } = await api.post("/auth/verify-otp", {
        email,
        otp,
      });

      setUser(data);

      localStorage.setItem("user", JSON.stringify(data));

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      console.log("OTP error:", error.response?.data);

      throw new Error(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        verifyOtp,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
