import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import { AiOutlineFileGif } from "react-icons/ai";
import { RiRobot2Fill } from "react-icons/ri";
import Logo from "../../../assets/img/dark.png";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { auth, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileDropdown = () => {
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={Logo} alt="AI Hub Logo" className="h-16 w-auto" />
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/ai-conversation"
              className={`px-3 py-3 rounded-md text-[0.9rem] font-medium flex items-center transition duration-200 ${
                isActive("/ai-conversation")
                  ? "bg-yellow-500 text-gray-900"
                  : "text-white hover:bg-gray-700 hover:bg-opacity-70"
              }`}
            >
              <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" />
              AI Conversations
            </Link>

            <Link
              to="/visual-creation"
              className={`px-3 py-3 rounded-md text-[0.9rem] font-medium flex items-center transition duration-200 ${
                isActive("/visual-creation")
                  ? "bg-yellow-500 text-gray-900"
                  : "text-white hover:bg-gray-700 hover:bg-opacity-70"
              }`}
            >
              <PhotoIcon className="h-5 w-5 mr-1" />
              Visual Creations
            </Link>

            <Link
              to="/curiosity-hub"
              className={`px-3 py-3 rounded-md text-[0.9rem] font-medium flex items-center transition duration-200 ${
                isActive("/curiosity-hub")
                  ? "bg-yellow-500 text-gray-900"
                  : "text-white hover:bg-gray-700 hover:bg-opacity-70"
              }`}
            >
              <QuestionMarkCircleIcon className="h-5 w-5 mr-1" />
              Curiosity Hub
            </Link>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white hover:bg-gray-700 hover:bg-opacity-70 px-3 py-3 rounded-md text-[0.9rem] font-medium flex items-center transition duration-200"
              >
                <RiRobot2Fill className="h-5 w-5 mr-1" />
                AI
                <svg
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-20">
                  <Link
                    to="/texttoimage"
                    className={`flex px-4 py-2 text-sm rounded-lg hover:bg-gray-700 ${
                      isActive("/texttoimage")
                        ? "bg-yellow-500 text-gray-900"
                        : ""
                    }`}
                  >
                    <DocumentTextIcon className="h-5 w-5 mr-1" />
                    Text-to-Image
                  </Link>
                  <Link
                    to="/gifsearch"
                    className={`flex px-4 py-2 text-sm rounded-lg hover:bg-gray-700 ${
                      isActive("/gifsearch")
                        ? "bg-yellow-500 text-gray-900"
                        : ""
                    }`}
                  >
                    <AiOutlineFileGif className="h-5 w-5 mr-1" />
                    Gif Search
                  </Link>
                </div>
              )}
            </div>

            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 text-white border border-red-600 rounded-md px-4 py-2 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-red-600 hover:border-red-700 text-sm font-medium"
              >
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-yellow-300 text-gray-800 border border-yellow-400 rounded-md px-4 py-2 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-yellow-400 hover:text-black hover:font-extrabold text-sm font-medium"
              >
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Login
              </Link>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`lg:hidden bg-gray-900 bg-opacity-90 overflow-scroll transform transition-max-height duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/ai-conversation"
            className={`px-3 py-3 rounded-md text-base font-medium flex items-center transition duration-200 ${
              isActive("/ai-conversation")
                ? "bg-yellow-500 text-gray-900"
                : "text-white hover:bg-gray-700 hover:bg-opacity-70"
            }`}
          >
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5 mr-1" />
            AI Conversations
          </Link>

          <Link
            to="/visual-creation"
            className={`px-3 py-3 rounded-md text-base font-medium flex items-center transition duration-200 ${
              isActive("/visual-creation")
                ? "bg-yellow-500 text-gray-900"
                : "text-white hover:bg-gray-700 hover:bg-opacity-70"
            }`}
          >
            <PhotoIcon className="h-5 w-5 mr-1" />
            Visual Creations
          </Link>

          <Link
            to="/curiosity-hub"
            className={`px-3 py-3 rounded-md text-base font-medium flex items-center transition duration-200 ${
              isActive("/curiosity-hub")
                ? "bg-yellow-500 text-gray-900"
                : "text-white hover:bg-gray-700 hover:bg-opacity-70"
            }`}
          >
            <QuestionMarkCircleIcon className="h-5 w-5 mr-1" />
            Curiosity Hub
          </Link>

          <div className="relative">
            <button
              onClick={toggleMobileDropdown}
              className="text-white hover:bg-gray-700 hover:bg-opacity-70 px-3 py-3 rounded-md text-[0.9rem] font-medium flex items-center transition duration-200 w-full"
            >
              <RiRobot2Fill className="h-5 w-5 mr-1" />
              AI
              <svg
                className="h-5 w-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isMobileDropdownOpen && (
              <div className="right-0 my-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg z-20">
                <Link
                  to="/texttoimage"
                  className={`block px-4 py-2 text-sm hover:bg-gray-700 ${
                    isActive("/texttoimage")
                      ? "bg-yellow-500 text-gray-900"
                      : ""
                  }`}
                >
                  Text-to-Image
                </Link>
                <Link
                  to="/gifsearch"
                  className={`block px-4 py-2 text-sm hover:bg-gray-700 ${
                    isActive("/gifsearch") ? "bg-yellow-500 text-gray-900" : ""
                  }`}
                >
                  Gif Search
                </Link>
              </div>
            )}
          </div>

          {isAuthenticated() ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 bg-red-500 text-white border border-red-600 rounded-md px-4 py-2 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-red-600 hover:border-red-700 text-sm font-medium"
            >
              <ArrowRightIcon className="h-5 w-5 mr-2" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="w-full flex items-center space-x-2 bg-yellow-300 text-gray-800 border border-yellow-400 rounded-md px-4 py-2 transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:scale-105 hover:bg-yellow-400 hover:text-black hover:font-extrabold text-sm font-medium"
            >
              <ArrowRightIcon className="h-5 w-5 mr-2" />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
