import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaImage, FaSpinner, FaDownload, FaMagic } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import { toast } from "react-hot-toast";

const TextToImage = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Text To Image - InfiniChat";
  }, []);

  const handleGenerateImage = async () => {
    if (!text.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setImageUrl("");

      const response = await axios.post(
        `${import.meta.env.VITE_INFINICHAT_BACKEND_URL}/api/image/generate-image`,
        {
          prompt: text,
        },
      );

      if (!response.data.imageUrl) {
        throw new Error("No image returned");
      }

      setImageUrl(response.data.imageUrl);

      toast.success("Image generated successfully!");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
          "Failed to generate image. Please try again.",
      );

      toast.error("Failed to generate image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7fb] pt-24">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FaMagic className="text-lg" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Text to Image
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Transform your ideas into AI-generated visuals instantly.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Describe Your Image
              </label>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Example: A futuristic cyberpunk city at night with neon lights and flying cars..."
                rows="6"
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 p-5 text-sm leading-7 text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
              />

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleGenerateImage}
                  disabled={loading}
                  className={`inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium text-white transition duration-200 ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading ? (
                    <>
                      <FaSpinner className="mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FaImage className="mr-2" />
                      Generate Image
                    </>
                  )}
                </button>

                {imageUrl && (
                  <a
                    href={imageUrl}
                    download="generated-image.png"
                    className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-50"
                  >
                    <FaDownload className="mr-2" />
                    Download
                  </a>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-8">
            {loading ? (
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaSpinner className="animate-spin text-3xl" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold text-gray-900">
                    Generating Your Image...
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    AI is creating something amazing.
                  </p>
                </div>
              </div>
            ) : imageUrl ? (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Generated Result
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Your AI-generated image is ready.
                  </p>
                </div>

                <div className="flex justify-center p-6">
                  <img
                    key={imageUrl}
                    src={imageUrl}
                    alt="Generated AI"
                    className="max-h-[700px] w-full max-w-4xl rounded-2xl object-cover shadow-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white shadow-sm">
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                    <FaImage className="text-3xl" />
                  </div>

                  <h2 className="mt-6 text-xl font-semibold text-gray-900">
                    No Image Generated Yet
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                    Enter a creative prompt above and generate stunning
                    AI-powered visuals.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TextToImage;
