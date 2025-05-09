require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectToDB = require("./db/db");
connectToDB();
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const userRouter = require("./Routes/user.routes");
const hackRouter = require("./Routes/hackathon");
const MongoStore = require("connect-mongo")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Must be true
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const sessionOptions = {
//   secret: "My_LOve",
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
//     maxAge: 1000 * 60 * 60 * 24 * 3,
//     httpOnly: true,
//   },
// };
// app.use(session(sessionOptions));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    ttl: 14 * 24 * 60 * 60
  }),
  cookie: {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use("/api/user", userRouter);
app.use("/api/hack", hackRouter);


// app.get("/protected",(req,res)=>{
//   console.log(req.session)
//   console.log(req.user)
//   res.send("protected")
// })

app.get('/protected', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({ message: 'Profile data', user: req.user });
});
app.listen(3000, (req, res) => {
  console.log("Port is connected to 3000");
});
