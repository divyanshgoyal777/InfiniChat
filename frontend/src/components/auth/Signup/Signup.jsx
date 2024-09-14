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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="max-w-md w-[95vw] md:w-full bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8 text-center">
          <img src={Logo} alt="Logo" className="mx-auto h-20 w-28 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500">
            Join us and start your journey
          </p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name..."
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              disabled={loading} 
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              disabled={loading}
            />
            <div className="absolute inset-y-0 right-0 pr-3 top-7 flex items-center text-sm leading-5">
              {showPassword ? (
                <EyeSlashIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <EyeIcon
                  className="h-5 w-5 text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <button
              className={`w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading} 
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
