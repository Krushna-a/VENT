import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhoneVolume, faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 justify-around items-center sm:items-start bg-blue-400 px-6 py-10">
      <div className="flex flex-col gap-3 items-center sm:items-start text-center sm:text-left">
        <div className="h-20 overflow-hidden">
          <img
            src="https://media-hosting.imagekit.io/80bc380dc20c4ef6/event-updatewd-logo.png?Expires=1840451502&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXTFuvsMBvQtNDq-XbMaaFam8pmtKWJHWLPv6nYgA7wDDCJkz4PThfdBoTQDURzDMgQ6UQ4rFXLNI43u~YUfrwW92xvK4cu6U0284iS9ys5w7keAwyJpwTlRUxFGcOE-MyF9pUE5JhZxAOpmDLlJtej-S4KRm1a7LQnmwlseTJTkEXH6-AF9xBFWv~2G~473a1BlfWAA2eFgULywOZzt2gomaU-TRBQGfRUje-1iABSQdcumAZwP4Eg4D8heuXlo0S0OFAt4~w~Jd28s~VdsJppTlK-UKVtnQQYM7Uko-XBvj3qAiIuY2i4vkH5pa548z8pg2D4nsUrg~uWZxMzRFw__"
            alt="Event Update Logo"
            className="w-40 bg-transparent mx-auto sm:mx-0"
          />
        </div>
        <p className="text-sm">Linking Campus Life, Creating Opportunities</p>
        <p className="text-xs">&copy; 2026 All Rights Reserved</p>
      </div>

      <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
        <p className="font-bold text-xl mb-2">Quick Links</p>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/events" className="hover:underline">Events</Link>
        <Link to="/hackathons" className="hover:underline">Hackathons</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
      </div>

      <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
        <p className="font-bold text-xl mb-2">Contact Us</p>
        <p className="flex items-center gap-2 text-sm">
          <FontAwesomeIcon icon={faPhoneVolume} /> +91 123 456 7890
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FontAwesomeIcon icon={faEnvelope} /> events@gmail.com
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FontAwesomeIcon icon={faLocationDot} /> Pune, Maharashtra
        </p>
        <div className="flex gap-5 text-2xl mt-3">
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="#" className="hover:text-white">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
