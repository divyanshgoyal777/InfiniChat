import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaDownload, FaImages } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import { toast } from "react-hot-toast";

const GifSearch = () => {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("funny");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const GIPHY_API_KEY = import.meta.env.VITE_INFINICHAT_GIPHY_API_KEY;
  const fetchGifs = async () => {
    if (!query.trim()) {
      toast.error("Please enter a search query.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: GIPHY_API_KEY,
          q: query,
          limit: 20,
        },
      });
      setGifs(response.data.data);
      toast.success("GIFs fetched successfully!");
    } catch (error) {
      console.error(error);
      setError("Failed to fetch GIFs. Please try again.");
      toast.error("Failed to fetch GIFs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "GIF Search - InfiniChat";
  }, []);

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#f5f7fb] pt-24">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <FaImages className="text-lg" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">GIF Search</h1>

                <p className="mt-1 text-sm text-gray-500">
                  Search and discover trending GIFs instantly.
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  placeholder="Search for GIFs..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && fetchGifs()}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white"
                />

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>

              <button
                onClick={fetchGifs}
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
              {gifs.length === 0 ? (
                <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white shadow-sm">
                  <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                      <FaImages className="text-3xl" />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-gray-900">
                      No GIFs Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Try searching with different keywords.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {gifs.map((gif) => (
                    <div
                      key={gif.id}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={gif.images.fixed_height.url}
                          alt={gif.title || "GIF"}
                          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-4">
                        <p className="line-clamp-2 min-h-[48px] text-sm leading-6 text-gray-600">
                          {gif.title || "Trending animated GIF from GIPHY."}
                        </p>

                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-400">GIPHY</span>

                          <a
                            href={gif.images.original.url}
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

export default GifSearch;
