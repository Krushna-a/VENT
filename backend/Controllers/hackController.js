const Hackathon = require("../models/hackModel");
const cloudinary = require("cloudinary").v2;
const User = require("../models/userModel");

const hackRegister = async (req, res) => {
  const { hackId } = req.body;
  const userId = req.user._id;
  console.log(userId)

  const user = await User.findById(userId);
  user.hacks.push(hackId);
  await user.save();

  const hack = await Hackathon.findById(hackId);
  hack.users.push(userId);
  await hack.save();

  res.status(200).send("hackathon registeration succssful");
};

const cancelRegister = async (req,res)=>{
  const { hackId } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);
  const newHacks = user.hacks.filter((item)=>item !== hackId)
  user.hacks = newHacks;
  await user.save();
  
  const hack = await Hackathon.findById(hackId);
  const newUsers = hack.users.filter((item)=>item !== userId)
  hack.users = newUsers;
  await hack.save();

  res.status(200).send("hackathon registeration succssful");
}
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
    };

    const newHackathon = new Hackathon(newData);
    await newHackathon
      .save()
      .then(() => {
        console.log("Data Is Stored successfully");
        res.status(200).send("Data is stored");
      })
      .catch((err) => {
        console.log(err)
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
};
