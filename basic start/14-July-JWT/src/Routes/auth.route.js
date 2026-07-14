const express = require("express");
const userModel = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userAlreadyExist = await userModel.findOne({ email });
  if (userAlreadyExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const user = await userModel.create({ username, email, password });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRETS,
  );

  res.cookie("jwt_token", token);
  res.status(201).json({
    message: "User registered successsfully...",
    user,
    token,
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  const passwordMatched = user.password === password;
  if (!passwordMatched) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRETS,
  );
  res.cookie("jwt_token", token);
  res.status(200).json({
    message: "User login successful",
    user,
    token,
  });
});

module.exports = authRouter;
