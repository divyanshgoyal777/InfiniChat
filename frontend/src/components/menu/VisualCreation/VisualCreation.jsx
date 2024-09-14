import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaDownload } from "react-icons/fa";
import Navbar from "../../layout/Navbar/Navbar";
import Footer from "../../layout/Footer/Footer";
import { toast } from "react-hot-toast";

const VisualCreation = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const UNSPLASH_ACCESS_KEY = "k7PBwQG01_95YNvW52iuvKlmhtYf1BR-IG-oldLKUEs";

  const fetchImages = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: { query, per_page: 15 },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      setImages(response.data.results);
      toast.success("Images fetched successfully!");
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images. Please try again.");
      toast.error("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [query]);

  useEffect(() => {
    document.title = "Visual Creation - InfiniChat";
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-6 flex flex-col">
        <h1 className="text-4xl font-extrabold mb-6 mt-20 text-center text-yellow-400">
          Image Gallery
        </h1>
        <div className="mb-6 flex justify-center items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for images"
            className="p-3 border border-gray-700 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 w-full max-w-md"
            aria-label="Search for images"
          />
          <button
            onClick={fetchImages}
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
            {images.length > 0 ? (
              images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.urls.regular}
                    alt={image.alt_description || "Image"}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm mb-2">
                      {image.alt_description || "No description"}
                    </p>
                    <a
                      href={image.urls.full}
                      download
                      className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                      aria-label={`Download ${
                        image.alt_description || "image"
                      }`}
                    >
                      <FaDownload />
                      Download
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No images found</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default VisualCreation;
