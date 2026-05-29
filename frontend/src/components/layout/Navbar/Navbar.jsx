import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineFileGif } from "react-icons/ai";
import Logo from "../../../assets/img/light.png";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };
  const isActive = (path) => location.pathname === path;
  const navLinks = [
    {
      name: "AI Chat",
      path: "/ai-conversation",
      icon: ChatBubbleBottomCenterTextIcon,
    },
    {
      name: "Visual Creations",
      path: "/visual-creation",
      icon: PhotoIcon,
    },
    {
      name: "Curiosity Hub",
      path: "/curiosity-hub",
      icon: QuestionMarkCircleIcon,
    },
    {
      name: "Text to Image",
      path: "/texttoimage",
      icon: DocumentTextIcon,
    },
    {
      name: "GIF Search",
      path: "/gifsearch",
      icon: AiOutlineFileGif,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              alt="InfiniChat Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition duration-200 ${
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center">
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
              >
                <ArrowRightIcon className="mr-2 h-5 w-5" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-blue-700"
              >
                <ArrowRightIcon className="mr-2 h-5 w-5" />
                Login
              </Link>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-gray-200 bg-white transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="space-y-2 px-4 py-4">
          {navLinks.map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition duration-200 ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}

          <div className="pt-3">
            {isAuthenticated() ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center rounded-xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
              >
                <ArrowRightIcon className="mr-2 h-5 w-5" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-700"
              >
                <ArrowRightIcon className="mr-2 h-5 w-5" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
