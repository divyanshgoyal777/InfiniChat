import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../layout/Navbar/Navbar";
import Footer from "../layout/Footer/Footer";
import Logo from "../../assets/img/light.png";
import {
  ChatBubbleBottomCenterTextIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";
import { AiOutlineFileGif } from "react-icons/ai";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Conversations",
    description:
      "Engage with advanced AI models for coding, writing, learning, and productivity.",
    icon: ChatBubbleBottomCenterTextIcon,
    color: "text-blue-600",
  },
  {
    title: "Visual Creations",
    description:
      "Generate AI-powered visuals and creative artwork from simple prompts.",
    icon: PhotoIcon,
    color: "text-pink-500",
  },
  {
    title: "Curiosity Hub",
    description:
      "Ask anything and get intelligent answers instantly with AI assistance.",
    icon: QuestionMarkCircleIcon,
    color: "text-yellow-500",
  },
  {
    title: "Text to Image",
    description:
      "Convert your imagination into high-quality AI-generated images.",
    icon: DevicePhoneMobileIcon,
    color: "text-green-500",
  },
  {
    title: "GIF Search",
    description:
      "Discover trending and relevant GIFs instantly for your content and chats.",
    icon: AiOutlineFileGif,
    color: "text-purple-500",
  },
];

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Home - InfiniChat";
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-gray-900">
      <Navbar />

      <section className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700 mb-6">
                AI Powered Platform
              </span>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
                Explore the Future of{" "}
                <span className="text-blue-600">AI Interaction</span>
              </h1>

              <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                InfiniChat brings together AI conversations, image generation,
                curiosity exploration, and creative tools in one seamless
                platform.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {isAuthenticated() ? (
                  <>
                    <Link
                      to="/ai-conversation"
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                      AI Conversations
                    </Link>

                    <Link
                      to="/visual-creation"
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                      Visual Creations
                    </Link>

                    <Link
                      to="/curiosity-hub"
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                      Curiosity Hub
                    </Link>

                    <Link
                      to="/texttoimage"
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                      Text to Image
                    </Link>

                    <Link
                      to="/gifsearch"
                      className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-600 hover:text-white transition duration-200"
                    >
                      GIF Search
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/signup"
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition duration-200"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <img
                src={Logo}
                alt="InfiniChat"
                className="w-full max-w-md object-contain"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Everything You Need in One Platform
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools designed for productivity, creativity, and
              smarter interaction.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <Icon className={`h-12 w-12 mb-5 ${feature.color}`} />

                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {!isAuthenticated() && (
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-blue-600 px-8 py-16 text-center text-white">
              <h2 className="text-4xl font-bold">Start Exploring AI Today</h2>

              <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                Create your account and unlock access to AI conversations,
                creative generation tools, and more.
              </p>

              <Link
                to="/signup"
                className="inline-block mt-8 rounded-xl bg-white px-8 py-3 text-blue-600 font-semibold hover:bg-gray-100 transition duration-200"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default HomePage;
