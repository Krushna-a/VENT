const express = require("express");
const hackRouter = express.Router();
const { addHackathon, getHackathon,getIndividualHack,hackRegister,cancelRegister } = require("../Controllers/hackController");
const { storage } = require("../config/config");
const multer = require("multer");
<<<<<<< HEAD
const upload = multer({storage});
=======
// const upload = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } });
const upload = multer({ storage });
>>>>>>> 243f019650f1478e5b5451ec45e905264520c472

hackRouter.post("/new", upload.single("bannerImage"), addHackathon);
hackRouter.get("/getHackathon",getHackathon)
hackRouter.get("/getIndividualHack/:hackId",getIndividualHack)
hackRouter.post("/register",hackRegister)
hackRouter.post("/cancel",cancelRegister)


module.exports = hackRouter;
