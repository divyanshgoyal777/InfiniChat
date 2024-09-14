import React, { useState, useEffect } from "react";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { FaUserCircle, FaRobot, FaPaperPlane } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

const CuriosityHub = () => {
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([
    { sender: "ai", message: "Hi! What's your curiosity today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchGeminiResponse = async (message) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/gemini/generate",
        {
          params: { question: message },
        }
      );

      if (response.status === 200) {
        return response.data.output || "AI did not respond";
      } else {
        throw new Error("There was an issue with the AI service.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to connect to AI service.");
      return "Failed to connect to AI service.";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInput.trim() === "") return;
    setUserInput("");
    setIsLoading(true);

    const newConversation = [
      ...conversation,
      { sender: "user", message: userInput },
    ];
    setConversation(newConversation);

    const aiResponse = await fetchGeminiResponse(userInput);

    setConversation([
      ...newConversation,
      { sender: "ai", message: aiResponse },
    ]);

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    document.title = "Curiosity Hub - InfiniChat";
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <div className="flex-1 p-4 mt-20 overflow-y-auto space-y-4">
          {conversation.map((entry, index) => (
            <div
              key={index}
              className={`flex items-start ${
                entry.sender === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              {entry.sender === "ai" && (
                <FaRobot
                  className="text-green-500 text-3xl mr-2"
                  aria-label="AI"
                />
              )}
              <div
                className={`bg-${
                  entry.sender === "ai" ? "blue-600" : "gray-700"
                } text-white p-4 rounded-lg max-w-xs relative ${
                  entry.sender === "user" ? "flex items-center" : ""
                }`}
                aria-label={`Message from ${entry.sender}`}
              >
                {entry.message}
              </div>
              {entry.sender === "user" && (
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
                <div className="h-8 w-8 border-t-2 border-blue-500 rounded-full animate-spin" />
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-800 p-4 flex items-center space-x-2 border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Message input"
          />
          <button
            onClick={handleSubmit}
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

export default CuriosityHub;
