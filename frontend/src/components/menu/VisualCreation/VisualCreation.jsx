import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaDownload } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import { toast } from "react-hot-toast";

const VisualCreation = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const UNSPLASH_ACCESS_KEY = import.meta.env
    .VITE_INFINICHAT_UNSPLASH_ACCESS_KEY;

  const fetchImages = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query,
            per_page: 20,
          },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        },
      );

      setImages(response.data.results);

      toast.success("Images fetched successfully!");
    } catch (error) {
      console.error(error);

      setError("Failed to fetch images. Please try again.");

      toast.error("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Visual Creation - InfiniChat";
  }, []);

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7fb] pt-24">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900">
              Visual Creations
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Discover high-quality visuals and search images instantly.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  placeholder="Search for images..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchImages()}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                />

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <button
                onClick={fetchImages}
                disabled={loading}
                className={`rounded-xl px-6 py-3 text-sm font-medium text-white transition duration-200 ${
                  loading
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="h-64 animate-pulse bg-gray-200"></div>

                  <div className="p-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>

                    <div className="mt-3 h-10 animate-pulse rounded-xl bg-gray-200"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {images.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800">
                    No Images Found
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Try searching with different keywords.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={image.urls.regular}
                          alt={image.alt_description || "Unsplash"}
                          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-600">
                          {image.alt_description ||
                            "Beautiful high-quality image from Unsplash."}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            Unsplash
                          </span>

                          <a
                            href={image.urls.full}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-blue-700"
                          >
                            <FaDownload className="text-xs" />
                            Download
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VisualCreation;
