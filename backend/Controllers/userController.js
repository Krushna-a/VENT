const express = require("express");
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {};
const editProfile = async (req, res) => {
  const {
    fullName,
    location,
    course,
    college,
    graduatingYear,
    courseDuration,
    gender,
  } = req.body;

  try {
    
    const userId = req.user._id;
    const currUser = await User.findById(userId);
    const email = currUser.email;

    const profile = await Profile.findOne({ userId: userId });
    let imageUrl = null;
    if (req.file) {
      const uploadedImg = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadedImg.secure_url;
    }


    let profileDetails = {
      fullName,
      location,
      course,
      college,
      graduatingYear,
      courseDuration,
      gender,
      email,
      userId,
    };
    console.log(imageUrl)
    if(imageUrl){
      profileDetails = {...profileDetails,profileImage:imageUrl}
    }
    const cleanedData = Object.fromEntries(
      Object.entries(profileDetails).filter(
        ([_, value]) => value !== "" && value !== undefined && value !== null
      )
    );

    if (profile) {
      const updatedProfile = await Profile.findOneAndUpdate(
        { userId },
        { $set: cleanedData },
        { new: true }
      );

      console.log(updatedProfile);

      if (!updatedProfile) {
        console.log("Profile not found");
        return res.status(400)
      };
      return res.status(201).json(updatedProfile);
    } else {
      const newProfile = new Profile(cleanedData);

      const result = await newProfile.save();

      console.log(result);
      return res.status(201).json(result);
    }
  } catch (error) {
    console.error("Error creating profile:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const loginUser = (req, res) => {
  return res.json({
    message: "Logged in successfully",
    user: {
      id: req.user._id,
    },
  });
};

const logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).send("Logged Out Successfully");
  });
};

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(200).send("User Registered successfully");
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Registration failed");
  }
};

module.exports = { loginUser, registerUser, logOut, getProfile, editProfile };
