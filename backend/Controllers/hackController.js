const Hackathon = require("../models/hackModel");
const cloudinary = require("cloudinary").v2;


const getIndividualHack = async (req, res) => {
  const hackId = req.params.hackId
  console.log(hackId)
  const response = await Hackathon.findById(hackId);
  console.log(response)
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
        console.log("Something Error Occured");
        res.status(400).send("Something Error Occurred");
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to create hackathon" });
  }
};

module.exports = { addHackathon, getHackathon, getIndividualHack };
