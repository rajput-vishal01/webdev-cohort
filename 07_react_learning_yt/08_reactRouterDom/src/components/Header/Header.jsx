import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-gray-900 border-gray-700 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Brand name */}
          <span className="text-white text-xl font-bold">Tech Innovators</span>

          {/* Hamburger Menu for Small Viewports */}
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Nav Links */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
            id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 border-b border-gray-700 duration-200
                  ${
                    isActive
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-400 border-transparent"
                  } 
                  lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                  }>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/aboutus"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 border-b border-gray-700 duration-200
                  ${
                    isActive
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-400 border-transparent"
                  } 
                  lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                  }>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contactus"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 border-b border-gray-700 duration-200
                  ${
                    isActive
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-400 border-transparent"
                  } 
                  lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                  }>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/github"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 border-b border-gray-700 duration-200
                  ${
                    isActive
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-400 border-transparent"
                  } 
                  lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                  }>
                  GitHub
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 border-b border-gray-700 duration-200
                  ${
                    isActive
                      ? "text-orange-500 border-orange-500"
                      : "text-gray-400 border-transparent"
                  } 
                  lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                  }>
                  User
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
