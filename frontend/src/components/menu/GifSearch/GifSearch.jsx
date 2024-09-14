import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaDownload } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { toast } from "react-hot-toast";

const GifSearch = () => {
  const [gifs, setGifs] = useState([]);
  const [query, setQuery] = useState("funny");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GIPHY_API_KEY = "YOUR_API_KEY";

  const fetchGifs = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: GIPHY_API_KEY,
          q: query,
          limit: 15,
        },
      });
      setGifs(response.data.data);
      toast.success("GIFs fetched successfully!");
    } catch (error) {
      console.error("Error fetching GIFs:", error);
      setError("Failed to fetch GIFs. Please try again.");
      toast.error("Failed to fetch GIFs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Gif Search - InfiniChat";
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-6 flex flex-col">
        <h1 className="text-4xl font-extrabold mb-6 mt-20 text-center text-yellow-400">
          GIF Gallery
        </h1>
        <div className="mb-6 flex justify-center items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for GIFs"
            className="p-3 border border-gray-700 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 w-full max-w-md"
            aria-label="Search for GIFs"
          />
          <button
            onClick={fetchGifs}
            className="p-3 bg-yellow-500 text-gray-900 rounded-r-lg border border-yellow-600 hover:bg-yellow-600 transition-colors flex items-center gap-2"
            aria-label="Search"
          >
            <FaSearch />
            Search
          </button>
        </div>
        {loading && <p className="text-center text-gray-400">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gifs.length > 0 ? (
              gifs.map((gif) => (
                <div key={gif.id} className="relative group">
                  <img
                    src={gif.images.fixed_height.url}
                    alt={gif.title || "GIF"}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm mb-2">
                      {gif.title || "No description"}
                    </p>
                    <a
                      href={gif.images.original.url}
                      download
                      className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                      aria-label={`Download ${gif.title || "GIF"}`}
                    >
                      <FaDownload />
                      Download
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No GIFs found</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default GifSearch;
