import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaRobot, FaPaperPlane } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import { toast } from "react-hot-toast";
import axios from "axios";

const AiConversation = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello 👋 How can I help you today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const GEMINI_API_URL = `${import.meta.env.VITE_INFINICHAT_BACKEND_URL}/api/gemini/generate`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    document.title = "AI Conversation - InfiniChat";
  }, []);

  const handleSend = async () => {
    if (!input.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    const userMessage = {
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = input;

    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(GEMINI_API_URL, {
          question: currentInput,
          text: "chat",
      });

      if (response.status === 200) {
        const aiResponse =
          response.data.output || "Sorry, I couldn't understand that.";

        setMessages((prev) => [
          ...prev,
          {
            text: aiResponse,
            sender: "ai",
          },
        ]);
      } else {
        throw new Error("Failed response");
      }
    } catch (error) {
      console.error(error);

      toast.error("Failed to connect to AI service.");

      setMessages((prev) => [
        ...prev,
        {
          text: "Something went wrong. Please try again.",
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="fixed inset-0 bg-[#f5f7fb] pt-20">
        <div className="mx-auto flex h-full max-w-6xl flex-col px-4 py-4">
          <div className="mb-4 rounded-2xl border border-gray-200 bg-white px-6 py-5 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900">
              AI Conversation
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Chat with AI and explore intelligent responses in real time.
            </p>
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[85%] items-end gap-3 ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {message.sender === "ai" ? (
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
                        message.sender === "ai"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-blue-600 text-white"
                      }`}
                    >
                      {message.text}
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
                  value={input}
                  placeholder="Type your message..."
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 rounded-xl border border-gray-300 bg-gray-50 px-5 py-3 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                />

                <button
                  onClick={handleSend}
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

export default AiConversation;
