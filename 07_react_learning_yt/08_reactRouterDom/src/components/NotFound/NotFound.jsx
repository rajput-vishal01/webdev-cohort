import React from "react";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-400">Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFound;
