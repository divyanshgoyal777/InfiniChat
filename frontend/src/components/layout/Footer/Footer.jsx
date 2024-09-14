import React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaTelegramPlane,
} from "react-icons/fa";
import Logo from "../../../assets/img/dark.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <img
              src={Logo}
              alt="InfiniChat Logo"
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm mb-4">
              InfiniChat is your gateway to the future of AI. Engage in
              conversations, create stunning visuals, and explore endless
              possibilities with AI-powered tools.
            </p>
            <p className="text-sm">
              Contact us:{" "}
              <a href="mailto:777divyanshgoyal@gmail.com" className="underline">
                777divyanshgoyal@gmail.com
              </a>
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/ai-conversation" className="hover:text-white">
                  AI Conversations
                </Link>
              </li>
              <li>
                <Link to="/visual-creation" className="hover:text-white">
                  Visual Creations
                </Link>
              </li>
              <li>
                <Link to="/curiosity-hub" className="hover:text-white">
                  Curiosity Hub
                </Link>
              </li>
              <li>
                <Link to="/texttoimage" className="hover:text-white">
                  Text-to-Image
                </Link>
              </li>
              <li>
                <Link to="/gifsearch" className="hover:text-white">
                  Gif Search
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                href="https://portfolioofdivyansh.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
                className="hover:text-white"
              >
                <FaBriefcase className="h-5 w-5" />
              </a>
              <a
                href="https://t.me/divyanshgoyal777"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="hover:text-white"
              >
                <FaTelegramPlane className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/divyanshgoyal777/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-white"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/divyanshgoyal777/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-white"
              >
                <FaLinkedinIn className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/divyanshgoyal777"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-white"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="mailto:777divyanshgoyal@gmail.com"
                aria-label="Email"
                className="hover:text-white"
              >
                <FaEnvelope className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm">
              Stay updated with our latest news and updates.
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <div className="mb-2">
            &copy; {new Date().getFullYear()} InfiniChat. All rights reserved.
          </div>
          <div>
            <Link to="/terms" className="hover:text-white ml-4">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-white ml-4">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
