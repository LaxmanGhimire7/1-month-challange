const express = require("express");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")

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

  const token = jwt.sign({
    id:user._id,
    email:user.email
  },
  process.env,JWT_SECRET
)

res.cookie("token", token)
res.status(201).json({
    message:"User registered successfully...",
    user,
    token
})

});

module.exports = Router;
