import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      setAuth({ user, token });
    }
  }, []);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: "http://localhost:3000/api",
    });

    axiosInstance.interceptors.request.use(
      async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem("refreshToken");
            const res = await axios.post(
              "http://localhost:3000/api/auth/refresh-token",
              { refreshToken }
            );
            const { accessToken } = res.data;
            localStorage.setItem("token", accessToken);
            setAuth((prevAuth) => ({ ...prevAuth, token: accessToken }));
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            return axios(originalRequest);
          } catch (refreshError) {
            console.error("Error refreshing access token:", refreshError);
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject();
      axiosInstance.interceptors.response.eject();
    };
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      setAuth({ user, token: accessToken });
      navigate("/dashboard");
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Invalid email or password.");
    }
  };

  const signup = async (fullName, email, password) => {
    try {
      await axios.post("http://localhost:3000/api/auth/signup", {
        fullName,
        email,
        password,
      });
      navigate("/login");
      toast.success("Sign up successful! Please log in.");
    } catch (error) {
      toast.error("Sign up failed. Please try again or use a different email.");
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("modalShown");
      setAuth({ user: null, token: null });
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const isAuthenticated = () => !!auth.token;

  return (
    <AuthContext.Provider
      value={{ auth, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
