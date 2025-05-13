const Hackathon = require("../models/hackModel");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");

const hackRegister = async (req, res) => {
  const { hackId } = req.body;
  const userId = req.user._id;
  console.log(userId);

  const hack = await Hackathon.findById(hackId);
  const exists = hack.users.some((item) =>{
    return item.toString() !== userId;
  })
  if(exists){
    res.send("Already Registered")
  }
  hack.users.push(userId);
  await hack.save();

  const user = await User.findById(userId);
  user.hacks.push(hackId);
  await user.save();

  res.status(200).send("hackathon registeration succssful");
};

const cancelRegister = async (req, res) => {
  try {
    const { hackId } = req.body;
    console.log("hackId:", hackId);
    const userId = req.user._id;

    const user = await User.findById(userId);
    const newHacks = user.hacks.filter((item) => {
      console.log("hack", item);
      return item.toString() !== hackId;
    });
    user.hacks = newHacks;
    await user.save();

    const hack = await Hackathon.findById(hackId);
    const newUsers = hack.users.filter((item) => {
      console.log("user", item);
      return item.toString() !== userId.toString();
    });
    hack.users = newUsers;
    await hack.save();

    res.status(200).send("Hackathon registration canceled");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getIndividualHack = async (req, res) => {
  const hackId = req.params.hackId;
  console.log(hackId);
  const response = await Hackathon.findById(hackId);
  console.log(response);
  res.status(200).send(response);
};
const getHackathon = async (req, res) => {
  const allHackathons = await Hackathon.find();
  res.status(200).send(allHackathons);
};
const addHackathon = async (req, res) => {
  const hackOwner = req.user._id;
  try {
    const {
      title,
      description,
      location,
      organisedBy,
      customLocation,
      startDate,
      endDate,
      registrationDeadline,
      eligibility,
      teamSize,
      maxTeamSize,
      prizes,
      timeline,
      website,
      contactEmail,
      rules,
    } = req.body;

    const uploadedImg = await cloudinary.uploader.upload(req.file.path);
    const imageUrl = uploadedImg.secure_url;

    const newData = {
      title,
      description,
      location,
      organisedBy,
      customLocation,
      startDate,
      endDate,
      registrationDeadline,
      eligibility,
      teamSize,
      maxTeamSize,
      bannerImage: imageUrl,
      prizes,
      timeline,
      website,
      contactEmail,
      rules,
      hackOwner
    };

    const isHackExist = await Hackathon.findOne({title:title})

    if(isHackExist){
      return res.status(200).send("Hack Already Exist");
    }

    const newHackathon = new Hackathon(newData);
    await newHackathon
      .save()
      .then(() => {
        console.log("Data Is Stored successfully");
        res.status(200).send("Data is stored");
      })
      .catch((err) => {
        console.log(err);
        console.log("Something Error Occured");
        res.status(400).send("Something Error Occurred");
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create hackathon" });
  }
};

module.exports = {
  addHackathon,
  getHackathon,
  getIndividualHack,
  hackRegister,
  cancelRegister,
};
