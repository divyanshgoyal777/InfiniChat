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
import Logo from "../../../assets/img/light.png";

const Footer = () => {
  const quickLinks = [
    {
      name: "AI Chat",
      path: "/ai-conversation",
    },
    {
      name: "Visual Creations",
      path: "/visual-creation",
    },
    {
      name: "Curiosity Hub",
      path: "/curiosity-hub",
    },
    {
      name: "Text to Image",
      path: "/texttoimage",
    },
    {
      name: "GIF Search",
      path: "/gifsearch",
    },
  ];

  const socials = [
    {
      icon: FaBriefcase,
      link: "https://portfolioofdivyansh.netlify.app/",
    },
    {
      icon: FaTelegramPlane,
      link: "https://t.me/divyanshgoyal777",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/divyanshgoyal777/",
    },
    {
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/divyanshgoyal777/",
    },
    {
      icon: FaGithub,
      link: "https://github.com/divyanshgoyal777",
    },
    {
      icon: FaEnvelope,
      link: "mailto:777divyanshgoyal@gmail.com",
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={Logo}
              alt="InfiniChat Logo"
              className="h-14 w-auto object-contain"
            />

            <p className="mt-5 text-sm leading-7 text-gray-600">
              InfiniChat is an AI-powered platform designed for conversations,
              creativity, exploration, and intelligent digital experiences.
            </p>

            <a
              href="mailto:777divyanshgoyal@gmail.com"
              className="mt-5 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              777divyanshgoyal@gmail.com
            </a>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>

            <ul className="mt-5 space-y-4">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-600 hover:text-blue-600 transition duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Platform</h3>

            <ul className="mt-5 space-y-4 text-sm text-gray-600">
              <li>AI Conversations</li>
              <li>Creative Generation</li>
              <li>Smart Exploration</li>
              <li>AI Visual Tools</li>
              <li>Modern User Experience</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Connect</h3>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              Follow updates, projects, and new releases across platforms.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} InfiniChat. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <Link
              to="/terms"
              className="hover:text-blue-600 transition duration-200"
            >
              Terms of Service
            </Link>

            <Link
              to="/privacy"
              className="hover:text-blue-600 transition duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
