import React from "react";

export default function Home() {
  return (
    <section
      id="home"
      className="w-full h-screen bg-gray-900 text-gray-200 flex flex-col justify-center items-center px-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl font-extrabold mb-6 text-orange-500">
          Welcome to Tech Innovators
        </h1>
        <p className="text-lg leading-relaxed mb-8">
          We are here to inspire, educate, and connect you with the latest
          innovations in technology. Explore groundbreaking ideas, industry
          insights, and hands-on tutorials designed to empower tech enthusiasts
          like you.
        </p>
        <button className="px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg">
          Get Started
        </button>
      </div>
    </section>
  );
}
