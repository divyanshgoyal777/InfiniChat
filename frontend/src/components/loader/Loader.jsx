import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;
