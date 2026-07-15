const express = require("express");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Router = express.Router();

//Register
Router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const emailAlreadyExists = await userModel.findOne({ email });
  if (emailAlreadyExists) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

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
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully...",
    user,
    token,
  });
});

//Authentication
Router.get("/get-me",async(req,res)=>{
    const token = req.cookies.token
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    const user = await userModel.findById(decoded.id)
    res.json({
        user
    })
})

//Login
Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(409).json({
      message: "User donot exists",
    });
  }

  const matchedPassword =
    user.password === crypto.createHash("md5").update(password).digest("hex");
  if (!matchedPassword) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User login successfully",
    user,
    token,
  });
});

module.exports = Router;
