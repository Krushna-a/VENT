import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingColumns,
  faGraduationCap,
  faUser,
  faCalendar,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  const currentYear = new Date().getFullYear();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const modalRef = useRef(null);

  const [showEditForm, setShowEditForm] = useState(false);
  const userProfile = async () => {
    const data = await axios.get("http://localhost:3000/api/user/profile", {
      withCredentials: true,
    });

    setUserData(data.data.profile);
  };
  // yaha par handle submit me profile pic update ka function likhna h
  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileData = {};
    if (profileImage) {
      profileData = {
        profileImage,
      };
    } else {
      profileData = {
        fullName,
        location,
        course,
        college,
        graduatingYear,
        courseDuration,
        gender,
        profileImage,
      };
    }

    const response = await axios.post(
      "http://localhost:3000/api/user/profile",
      profileData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    userProfile();
  }, []);

  const handleFileChange = (event) => {
    setProfileImage(event.target.files[0]);
  };
  return (
    <div className="w-full flex items-center my-5 md:my-10 flex-col gap-5 px-4 sm:px-0 pt-24">
      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blurred Background */}
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

          {/* Modal Content */}
          <div
            ref={modalRef}
            className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Upload File
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="block cursor-pointer">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-medium text-blue-600">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    {profileImage && (
                      <p className="mt-2 text-sm text-gray-900">
                        Selected: {profileImage.name}
                      </p>
                    )}
                  </label>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!profileImage}
                    className={`px-4 py-2 text-white rounded-lg ${
                      profileImage
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-blue-400 cursor-not-allowed"
                    }`}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Profile Card */}
      <div className="relative group w-full max-w-4xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl transform -rotate-1 group-hover:rotate-0 transition duration-300"></div>
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-6 md:p-8 flex flex-col items-center md:items-start">
              <div className="relative">
                <img
                  src={`${
                    userData.profileImage
                      ? userData.profileImage
                      : "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }`}
                  // src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Profile"
                  className="h-32 w-32 sm:h-40 sm:w-40 object-cover rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 shadow-md">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                </div>
              </div>
              <button
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center"
                onClick={() => setIsOpen(true)}
              >
                Change Photo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 md:p-8 flex-1">
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {userData.fullName}
                  </h2>
                  <p className="text-blue-600 font-medium">
                    {{
                      1: "1st",
                      2: "2nd",
                      3: "3rd",
                      4: "Final",
                    }[userData.graduatingYear - currentYear] || "-"}{" "}
                    Year Student
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <FontAwesomeIcon
                        icon={faBuildingColumns}
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">University</p>
                      <p className="font-medium">{userData.college}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Degree</p>
                      <p className="font-medium">{userData.course}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                      <FontAwesomeIcon icon={faCalendar} className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Graduation Year</p>
                      <p className="font-medium">{userData.graduatingYear}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded-full text-pink-600">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="h-5 w-5"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{userData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="w-full max-w-4xl flex flex-row-reverse shadow-lg rounded-lg py-2">
        <button
          className="border bg-blue-700 px-6 py-1 sm:px-10 sm:py-2 m-2 rounded-full text-gray-200 font-bold text-base sm:text-lg hover:scale-105 transition-all ease-in duration-200"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          {showEditForm ? "Hide Edit Profile" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Form */}
      <ProfileForm showEditForm={showEditForm}></ProfileForm>
    </div>
  );
};

export default Profile;
