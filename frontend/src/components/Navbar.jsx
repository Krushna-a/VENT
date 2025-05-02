import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBars,
  faXmark,
  faSignOutAlt,
  faUser,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [showProfileMenu, setShowProfilMenu] = useState(false);
  return (
    <>
      <div
        className={`${
          sideBar
            ? "w-[90%] block transition-all duration-[3000ms] ease-in-out"
            : "w-0 hidden transition-all duration-[3000ms] ease-in-out"
        } h-screen absolute top-0 left-0 bg-white z-10 flex flex-col gap-5 p-10`}
      >
        <div onClick={() => setSideBar(false)} className=" text-2xl">
          <FontAwesomeIcon icon={faXmark} />
        </div>
        <div className="flex flex-col items-start gap-5">
          {["Home", "Events", "Hackathons", "About Us", "Contact Us"].map(
            (text, idx) => (
              <NavLink
                key={idx}
                to={
                  text === "Home"
                    ? "/"
                    : `/${text.toLowerCase().replace(/\s/g, "")}`
                }
                className="flex flex-col items-start group w-full border-b-2 border-black hover:text-2xl"
                onClick={() => setSideBar(false)}
              >
                <p className="text-center">{text}</p>
                <hr className="border-t-4 rounded-full w-0 border-[#42AE9A] transition-all duration-300 group-hover:w-full hidden group-hover:block" />
              </NavLink>
            )
          )}
        </div>
      </div>
      <div className="border h-20 w-full flex justify-between items-center px-4 sm:px-10 shadow-md">
        <div
          className="block sm:hidden"
          onClick={() => {
            setSideBar(true);
            console.log(sideBar);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Logo */}
        <NavLink to="/" className="h-20 flex items-center">
          <img
            src="https://media-hosting.imagekit.io/80bc380dc20c4ef6/event-updatewd-logo.png?Expires=1840451502&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXTFuvsMBvQtNDq-XbMaaFam8pmtKWJHWLPv6nYgA7wDDCJkz4PThfdBoTQDURzDMgQ6UQ4rFXLNI43u~YUfrwW92xvK4cu6U0284iS9ys5w7keAwyJpwTlRUxFGcOE-MyF9pUE5JhZxAOpmDLlJtej-S4KRm1a7LQnmwlseTJTkEXH6-AF9xBFWv~2G~473a1BlfWAA2eFgULywOZzt2gomaU-TRBQGfRUje-1iABSQdcumAZwP4Eg4D8heuXlo0S0OFAt4~w~Jd28s~VdsJppTlK-UKVtnQQYM7Uko-XBvj3qAiIuY2i4vkH5pa548z8pg2D4nsUrg~uWZxMzRFw__"
            alt="Logo"
            className="w-24 sm:w-40 bg-transparent"
          />
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden sm:flex gap-8 text-lg items-center">
          {["Home", "Events", "Hackathons", "About Us", "Contact Us"].map(
            (text, idx) => (
              <NavLink
                key={idx}
                to={
                  text === "Home"
                    ? "/"
                    : `/${text.toLowerCase().replace(/\s/g, "")}`
                }
                className="flex flex-col items-center group"
              >
                <p className="text-center">{text}</p>
                <hr className="border-t-4 rounded-full w-0 border-[#42AE9A] transition-all duration-300 group-hover:w-full hidden group-hover:block" />
              </NavLink>
            )
          )}
        </div>

        {/* Icons and Avatar */}
        <div className="flex gap-4 items-center">
          <button className="text-[#42AE9A] text-xl hover:text-black transition-colors duration-300">
            <FontAwesomeIcon icon={faBell} />
          </button>

          <img
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            alt="User"
            className="h-10 w-10 rounded-full object-cover relative"
            onMouseEnter={() => setShowProfilMenu(true)}
            onMouseLeave={() => setShowProfilMenu(false)}
          />
        </div>
      </div>
      <div
        className={`${
          showProfileMenu ? "block" : "hidden"
        } absolute top-[55px] right-[55px] z-10 flex flex-col gap-3 p-5 border rounded-md bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-gray-200 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-80`}
        onMouseEnter={() => setShowProfilMenu(true)}
        onMouseLeave={() => setShowProfilMenu(false)}
      >
        <NavLink to="/user/profile" className="flex items-center space-x-2 cursor-pointer hover:text-blue-400 transition border-b-2 border-gray-500 hover:scale-105">
          <FontAwesomeIcon icon={faUser} />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/user/login" className="flex items-center space-x-2 cursor-pointer hover:text-green-400 transition border-b-2 border-gray-500 hover:scale-105">
          <FontAwesomeIcon icon={faSignInAlt} />
          <span>Log In</span>
        </NavLink>
        <NavLink to="/user/login" className="flex items-center space-x-2 cursor-pointer hover:text-yellow-400 transition border-b-2 border-gray-500 hover:scale-105">
          <FontAwesomeIcon icon={faUserPlus} />
          <span>Register</span>
        </NavLink>
        <NavLink  className="flex items-center space-x-2 cursor-pointer hover:text-red-400 transition border-b-2 border-gray-500 hover:scale-105">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Logout</span>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
