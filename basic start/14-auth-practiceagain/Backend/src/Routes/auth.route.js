const express = require("express");
const userModel = require("../Model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

//Register
authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.create({
    username,
    email,
    password: crypto.createHash("md5").update(password).digest("hex"),
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registered successfully...",
    user,
    token,
  });
});

//Protected or get-me route to see the authentication -> who is the person
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.jwt_token; // the name at last should be the prefix 8i used at top res.cookies....
  // console.log(token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  // console.log(decoded)
  const user = await userModel.findById(decoded.id);
  res.json({
    user: {
      id: user._id,
      email: user.email,
    },
  });
});

//Login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const emailExists = await userModel.findOne({ email });
  if (!emailExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const passwordMatched = emailExists.password === crypto.createHash("md5").update(password).digest("hex");
  if (!passwordMatched) {
    res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: emailExists._id,
      email: emailExists.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.cookie("jwt_token",token)

res.status(200).json({
    message:"User login successful",
    emailExists,
    token
})
});



module.exports = authRouter;
