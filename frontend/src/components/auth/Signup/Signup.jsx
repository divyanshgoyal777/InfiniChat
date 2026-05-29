import React, { useState, useEffect } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Logo from "../../../assets/img/light.png";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(fullName, email, password);
    } catch (error) {
      toast.error("Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Sign Up - InfiniChat";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#eef2f7] px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-[#f8fafc] p-8 shadow-md">
        <div className="text-center mb-8">
          <img src={Logo} alt="Logo" className="mx-auto h-20 object-contain" />

          <h2 className="mt-5 text-3xl font-bold text-gray-800">
            Create Account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Join InfiniChat and start your journey
          </p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              disabled={loading}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mb-3 relative">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-gray-800 placeholder-gray-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-[44px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full rounded-xl py-3 font-semibold text-white transition duration-200 ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-[#2563eb] hover:bg-[#1d4ed8]"
            }`}
          >
            {loading ? "Signing up..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
