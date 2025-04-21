import { useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState("slategray");

  function changeColor(newColor) {
    setColor(newColor);
  }

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}>
      <div className="fixed bottom-12 inset-x-0 px-2 flex justify-center">
        <div className="flex flex-wrap justify-center gap-3 bg-white shadow-xl px-4 py-3 rounded-3xl ring-2 ring-gray-300/50">
          <button
            onClick={() => changeColor("#708090")} // Slate Gray
            className="px-4 py-2 rounded-full bg-slate-600 text-white font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400/50 transition-colors duration-200">
            Slate
          </button>
          <button
            onClick={() => changeColor("#778899")} // Light Slate Gray
            className="px-4 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400/50 transition-colors duration-200">
            Gray
          </button>
          <button
            onClick={() => changeColor("#D3D3D3")} // Light Gray
            className="px-4 py-2 rounded-full bg-gray-400 text-white font-semibold hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300/50 transition-colors duration-200">
            Light Gray
          </button>
          <button
            onClick={() => changeColor("#B0C4DE")} // Light Steel Blue
            className="px-4 py-2 rounded-full bg-blue-300 text-white font-semibold hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300/50 transition-colors duration-200">
            Steel Blue
          </button>
          <button
            onClick={() => changeColor("#A9A9A9")} // Dark Gray
            className="px-4 py-2 rounded-full bg-gray-500 text-white font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400/50 transition-colors duration-200">
            Dark Gray
          </button>
          <button
            onClick={() => changeColor("#2F4F4F")} // Dark Slate Gray
            className="px-4 py-2 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-700/50 transition-colors duration-200">
            Dark Slate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
