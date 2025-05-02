const express = require("express");
const passport = require("passport");
const userRouter = express.Router();
const { storage } = require("../config/config");
const multer = require("multer");
// const upload = multer({ storage, limits: { fieldSize: 10 * 1024 * 1024 } });
const upload = multer({ dest: "uploads/" });
const {
  loginUser,
  registerUser,
  logOut,
  getProfile,
  editProfile,
} = require("../Controllers/userController");

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

userRouter.post("/register", registerUser);
// userRouter.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/protected",
//     failureRedirect: "/login",
//     failureMessage: "Some error occurred"
//   })
// );

userRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({
        message: "Logged in successfully",
        user: { id: user._id, email: user.email },
      });
    });
  })(req, res, next);
});

userRouter.post("/logout", logOut);
userRouter.get("/profile", requireAuth, getProfile);
userRouter.post(
  "/profile",
  requireAuth,
  upload.single("profileImage"),
  editProfile
);

module.exports = userRouter;
