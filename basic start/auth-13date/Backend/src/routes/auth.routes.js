const express = require("express");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    return res.status(409).json({
      message: "User already exists with this email, try with new one",
    });
  }
  const user = await userModel.create({ username, email, password });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registerd successfully...",
    user,
    token,
  });
});

module.exports = authRouter;
