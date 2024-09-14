import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Logo from "../../assets/img/dark.png";
import {
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineFileGif } from "react-icons/ai";
import { motion } from "framer-motion";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const modalShown = localStorage.getItem("modalShown");
    if (!modalShown) {
      setShowModal(true);
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem("modalShown", "true");
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-background")) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.title = "Home - InfiniChat";
  }, []);

  return (
    <div>
      {showModal ? (
        <motion.div
          className="modal-background fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleOutsideClick} 
        >
          <motion.div
            className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-yellow-400 mb-4">
              Important Notice
            </h2>
            <p className="text-gray-300 mb-6">
              Please be aware that the APIs used on this site are subject to
              updates and changes by their respective providers. As a result,
              service availability and functionality may vary. We strive to
              maintain the best experience but cannot guarantee continuous
              operation at all times.
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              aria-label="Close Modal"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <div>
          <Navbar />
          <div className="bg-gray-900 text-white">
            <section className="relative bg-gradient-to-br from-gray-800 to-gray-900 h-screen pt-20 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex flex-col lg:flex-row items-center justify-between h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.75, ease: "easeOut" }} 
                    className="text-center lg:text-left"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                      Welcome to{" "}
                      <span className="text-blue-500">InfiniChat</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                      Connect with cutting-edge AI through our platform. Access
                      powerful chat, image generation, and Q&A services powered
                      by leading AI technologies.
                    </p>
                    {isAuthenticated() ? (
                      <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <Link
                            to="/ai-conversation"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 text-center w-full max-w-xs lg:w-48"
                            aria-label="Go to AI Conversations"
                          >
                            AI Conversations
                          </Link>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <Link
                            to="/visual-creation"
                            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 text-center w-full max-w-xs lg:w-48"
                            aria-label="Go to Visual Creations"
                          >
                            Visual Creations
                          </Link>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <Link
                            to="/curiosity-hub"
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 text-center w-full max-w-xs lg:w-48"
                            aria-label="Go to Curiosity Hub"
                          >
                            Curiosity Hub
                          </Link>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <Link
                            to="/texttoimage"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 text-center w-full max-w-xs lg:w-48"
                            aria-label="Go to Text-to-Image"
                          >
                            Text-to-Image
                          </Link>
                        </motion.div>
                        <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className="flex justify-center lg:justify-start"
                        >
                          <Link
                            to="/gifsearch"
                            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 text-center w-full max-w-xs lg:w-48"
                            aria-label="Go to Gif Search"
                          >
                            Gif Search
                          </Link>
                        </motion.div>
                      </div>
                    ) : (
                      <Link
                        to="/signup"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300"
                        aria-label="Sign Up"
                      >
                        Get Started
                      </Link>
                    )}
                  </motion.div>
                  <div className="mt-10 lg:mt-0 lg:ml-10 flex justify-center">
                    <motion.img
                      src={Logo}
                      alt="InfiniChat Logo"
                      className="w-[10rem] max-w-xs md:max-w-sm lg:max-w-md"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.75, ease: "easeOut" }}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">
                  Explore Our AI-Powered Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ChatBubbleBottomCenterTextIcon className="h-12 w-12 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      AI Conversations
                    </h3>
                    <p className="text-gray-400">
                      Engage in dynamic conversations powered by cutting-edge AI
                      technologies.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PhotoIcon className="h-12 w-12 text-pink-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Visual Creations
                    </h3>
                    <ul className="text-gray-400">
                      <li>Generate stunning images from text descriptions.</li>
                      <li>Explore artistic creations in seconds.</li>
                    </ul>
                  </motion.div>
                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <QuestionMarkCircleIcon className="h-12 w-12 text-yellow-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Curiosity Hub
                    </h3>
                    <p className="text-gray-400">
                      Get instant answers to complex questions with our AI Q&A
                      tool.
                    </p>
                  </motion.div>
                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <DevicePhoneMobileIcon className="h-12 w-12 text-teal-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Text-to-Image
                    </h3>
                    <ul className="text-gray-400">
                      <li>Create AI-generated images from your input text.</li>
                      <li>Visualize your ideas and explore AI art.</li>
                    </ul>
                  </motion.div>
                  <motion.div
                    className="bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AiOutlineFileGif className="h-12 w-12 text-purple-500 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Gif Search</h3>
                    <ul className="text-gray-400">
                      <li>Search for GIFs based on your prompts.</li>
                      <li>Ideal for accessibility and content creation.</li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default HomePage;
