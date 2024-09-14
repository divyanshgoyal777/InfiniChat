import React, { useState, useEffect } from "react";
import { FaUserCircle, FaRobot, FaPaperPlane } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { toast } from "react-hot-toast";
import axios from "axios";

const AiConversation = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How are you?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const GEMINI_API_URL = "http://localhost:3000/api/gemini/generate";

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setIsLoading(true);

      try {
        const response = await axios.get(GEMINI_API_URL, {
          params: { question: input },
        });

        if (response.status === 200) {
          const modelResponse =
            response.data.output || "Sorry, I didn't get that.";

          setMessages([
            ...messages,
            { text: input, sender: "user" },
            { text: modelResponse, sender: "ai" },
          ]);
        } else {
          throw new Error("There was an issue with the AI service.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to connect to AI service.");
        setMessages([
          ...messages,
          {
            text: "Sorry, there was an error. Please try again.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn("Please enter a message before sending.");
    }
  };

  useEffect(() => {
    document.title = "Ai Conversation - InfiniChat";
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <div className="flex-1 p-4 mt-20 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start ${
                message.sender === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              {message.sender === "ai" && (
                <FaRobot
                  className="text-green-500 text-3xl mr-2"
                  aria-label="AI"
                />
              )}
              <div
                className={`bg-${
                  message.sender === "ai" ? "blue-600" : "gray-700"
                } text-white p-4 rounded-lg max-w-xs relative ${
                  message.sender === "user" ? "flex items-center" : ""
                }`}
                aria-label={`Message from ${message.sender}`}
              >
                {message.text}
              </div>
              {message.sender === "user" && (
                <div className="flex-shrink-0">
                  <FaUserCircle
                    className="text-blue-500 text-3xl ml-2"
                    aria-label="User"
                  />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center justify-start space-x-3">
              <FaRobot className="text-green-500 text-3xl animate-spin" />
              <div className="bg-gray-800 text-white p-4 rounded-lg max-w-xs">
                <div className="animate-spin h-8 w-8 border-t-2 border-blue-500 rounded-full" />
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-4 flex items-center space-x-2 border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Message input"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            aria-label="Send message"
          >
            <FaPaperPlane className="text-lg" />
            <span className="ml-2">Send</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AiConversation;
