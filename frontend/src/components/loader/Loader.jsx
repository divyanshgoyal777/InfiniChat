import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f5f7fb] z-50">
      <div className="flex flex-col items-center">
        <div className="loader-spinner"></div>
        <p className="mt-4 text-sm font-medium text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
