import React from "react";

export default function AboutUs() {
  return (
    <section
      id="aboutus"
      className="w-full h-screen bg-gray-800 text-gray-200 flex flex-col justify-center items-center px-8">
      <div className="max-w-5xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-orange-500">About Us</h2>
        <p className="text-lg leading-relaxed mb-6">
          Tech Innovators is more than a platform; it's a community. We are
          passionate about driving innovation and sharing knowledge. From AI to
          Web Development, we aim to provide resources and opportunities for
          individuals to thrive in the tech landscape.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          Our mission is to bridge the gap between enthusiasts and the latest
          advancements, fostering growth, learning, and collaboration in the
          tech world.
        </p>
        <button className="px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg">
          Learn More
        </button>
      </div>
    </section>
  );
}
