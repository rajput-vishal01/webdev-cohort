import React from "react";

export default function ContactUs() {
  return (
    <section
      id="contactus"
      className="w-full h-screen bg-gray-900 text-gray-200 flex flex-col justify-center items-center px-8">
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-orange-500">Contact Us</h2>
        <p className="text-lg mb-8">
          Whether you have questions, suggestions, or partnership opportunities,
          we'd love to hear from you. Reach out and let's connect!
        </p>
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 bg-gray-700 text-gray-200 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 bg-gray-700 text-gray-200 rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="w-full p-4 bg-gray-700 text-gray-200 rounded-lg"></textarea>
          <button
            type="submit"
            className="px-6 py-3 bg-orange-700 hover:bg-orange-800 text-white font-bold rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
