import React from "react";
import { useParams } from "react-router-dom";

function User() {
  const { userid } = useParams();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">User: {userid}</h1>
        <p className="text-lg text-gray-400">This is the user's profile page.</p>
      </div>
    </div>
  );
}

export default User;
