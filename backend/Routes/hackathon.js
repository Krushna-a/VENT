const express = require("express");
const hackRouter = express.Router();
const { addHackathon, getHackathon,getIndividualHack } = require("../Controllers/hackController");
const { storage } = require("../config/config");
const multer = require("multer");
// const upload = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } });
const upload = multer({ dest: "uploads/" });

hackRouter.post("/new", upload.single("bannerImage"), addHackathon);
hackRouter.get("/getHackathon",getHackathon)
hackRouter.get("/getIndividualHack/:hackId",getIndividualHack)

module.exports = hackRouter;
