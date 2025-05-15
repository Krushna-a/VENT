import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (sideBar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sideBar]);

  return (
    <>
      <div
        className={`${
          sideBar
            ? "w-[90%] block transition-all duration-[3000ms] ease-in-out z-[100] overflow-y-auto"
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
      <div className={`border h-20 w-full flex justify-between items-center px-4 sm:px-10 shadow-md fixed w-full top-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/10 rounded-full mt-5 border-red-900 ${sideBar ? "hidden" : "flex"}`}>
        <div
          className="block sm:hidden"
          onClick={() => {
            setSideBar(true);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Logo */}
        <NavLink to="/" className="h-20 flex items-center">
          <img
                src="https://media-hosting.imagekit.io/d8ac7d5ae5f94061/Adobe%20Express%20-%20file.png?Expires=1841749058&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=cK5ZjfP4xwNsuXCLqcIM53Cwl0VHLoscwVdAHwNEiAY4sYsf-K3fH5w3uxAx--Zy0~uMXsm1ibJQqGhbfrWOSTg9U0G4-St94tdL1DU5ccDHmP5EBu3MIIFj4W-RKtrSRda7uCYlfSGwqjT~gBds1H117BWQA32IRX-IGGR6awBhj2XwttRnQF59o4q3Y0VNDTymEnsuRpDY8XnOWwkyBIFJu10-d440xD2hY4CL~SmfuXSyq8wpLviRFxmTpWNXd613g0atL3zbRAfCOW7LPiA6CoHY-J2vvxGwsC-q5l7ELzgJfar4HN0AIsFsiHT9Eso8OGZqnhxKZeqo-pnpZQ__"
                alt="Event Update Logo"
                className="h-full w-auto object-contain mix-blend-multiply"
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
        } absolute top-[70px] right-[55px] z-50 flex flex-col gap-3 p-5 border rounded-md bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-gray-200 rounded-2xl shadow-2xl backdrop-blur-md bg-opacity-80`}
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