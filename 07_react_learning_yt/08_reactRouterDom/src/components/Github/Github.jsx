import React, { useState, useEffect } from "react";

import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();

  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch("https://api.github.com/users/hiteshchoudhary")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);

  if (!data) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center max-w-sm p-6 bg-gray-800 rounded-lg shadow-lg">
        {/* Profile Image */}
        <img
          src={data.avatar_url}
          alt={data.login}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        {/* User Info */}
        <h1 className="text-3xl font-bold mb-2">{data.name || data.login}</h1>
        <p className="text-lg text-gray-400 mb-4">
          {data.bio || "No bio available."}
        </p>
        <p className="text-sm text-gray-500 mb-2">
          <strong>Followers:</strong> {data.followers}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Following:</strong> {data.following}
        </p>
      </div>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/hiteshchoudhary");
  return response.json();
}; //load it in the main.jsx and add loader to github route and load there.
