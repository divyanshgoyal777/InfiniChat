import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaUserCircle, FaRobot, FaPaperPlane } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import { toast } from "react-hot-toast";

const CuriosityHub = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([
    {
      sender: "ai",
      message: "Hi 👋 What's your curiosity today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const GEMINI_API_URL = `${import.meta.env.VITE_INFINICHAT_BACKEND_URL}/api/gemini/generate`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversation]);

  useEffect(() => {
    document.title = "Curiosity Hub - InfiniChat";
  }, []);

  const fetchGeminiResponse = async (message) => {
    try {
      const response = await axios.post(GEMINI_API_URL, {
          question: message,
          type: "curiosity",
      });

      if (response.status === 200) {
        return response.data.output || "AI did not respond.";
      }

      throw new Error("AI service issue.");
    } catch (error) {
      console.error(error);

      toast.error("Failed to connect to AI service.");

      return "Something went wrong. Please try again.";
    }
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    const currentMessage = userInput;

    setUserInput("");

    setConversation((prev) => [
      ...prev,
      {
        sender: "user",
        message: currentMessage,
      },
    ]);

    setIsLoading(true);

    const aiResponse = await fetchGeminiResponse(currentMessage);

    setConversation((prev) => [
      ...prev,
      {
        sender: "ai",
        message: aiResponse,
      },
    ]);

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <Navbar />

      <div className="fixed inset-0 bg-[#f5f7fb] pt-20">
        <div className="mx-auto flex h-full max-w-6xl flex-col px-4 py-4">
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">Curiosity Hub</h1>

            <p className="mt-1 text-sm text-gray-500">
              Ask questions, explore ideas, and get intelligent AI-powered
              answers instantly.
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {conversation.map((entry, index) => (
                <div
                  key={index}
                  className={`flex ${
                    entry.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] items-end gap-3 ${
                      entry.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {entry.sender === "ai" ? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                          <FaRobot className="text-lg" />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700">
                          <FaUserCircle className="text-xl" />
                        </div>
                      )}
                    </div>

                    <div
                      className={`rounded-2xl px-5 py-4 text-sm leading-7 shadow-sm ${
                        entry.sender === "ai"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {entry.message}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-end gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FaRobot className="text-lg" />
                    </div>

                    <div className="rounded-2xl bg-gray-100 px-5 py-4 shadow-sm">
                      <div className="flex gap-2">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>

                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]"></span>

                        <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={userInput}
                  placeholder="Ask anything..."
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-5 py-3 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                />

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-white transition duration-200 ${
                    isLoading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <FaPaperPlane className="mr-2 text-sm" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CuriosityHub;
