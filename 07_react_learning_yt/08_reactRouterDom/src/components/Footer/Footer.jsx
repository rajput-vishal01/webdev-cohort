import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="max-w-4xl mx-auto text-center">
        <p>&copy; 2024 Tech Innovators. All rights reserved.</p>
        <p>
          Follow us on{" "}
          <a
            href="#"
            className="text-orange-500 hover:underline">
            Twitter
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-orange-500 hover:underline">
            LinkedIn
          </a>.
        </p>
      </div>
    </footer>
  );
}
