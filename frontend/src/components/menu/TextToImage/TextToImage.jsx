import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaImage, FaSpinner } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { toast, Toaster } from "react-hot-toast";

const TextToImage = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "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";
  const MODEL_URL =
    "https://api-inference.huggingface.co/models/XLabs-AI/flux-RealismLora";

  const handleGenerateImage = async () => {
    if (!text.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    setLoading(true);
    setImageUrl("");
    setError("");

    try {
      const response = await axios.post(
        MODEL_URL,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          responseType: "arraybuffer",
        }
      );

      const imageBlob = new Blob([response.data], { type: "image/png" });
      const imageUrl = URL.createObjectURL(imageBlob);

      setImageUrl(imageUrl);
      toast.success("Image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image. Please try again.");
      toast.error("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Text-To-Image - InfiniChat";
  }, []);

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <div className="flex flex-col h-screen items-center w-full max-w-4xl mx-auto mt-20 p-4 space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-yellow-400 text-center">
            Text-to-Image
          </h1>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter description here..."
            className="p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 w-full sm:max-w-lg"
            rows="5"
            aria-label="Enter description for image generation"
          />

          <div className="flex justify-center w-full">
            <button
              onClick={handleGenerateImage}
              disabled={loading}
              className={`p-4 mb-4 w-full sm:w-auto ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500"
              } text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2`}
              aria-label={loading ? "Generating image" : "Generate Image"}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <FaImage /> Generate Image
                </>
              )}
            </button>
          </div>

          {error && <div className="text-center text-red-500">{error}</div>}

          {imageUrl && (
            <div className="flex justify-center w-full mt-6">
              <img
                src={imageUrl}
                alt="Generated"
                className="w-full max-w-sm h-auto rounded-lg shadow-lg"
                aria-label="Generated image"
              />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TextToImage;
