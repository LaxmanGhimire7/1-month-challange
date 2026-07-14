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

  res.cookie("jwt_token", token)
  res.status(201).json({
    message: "User registered successsfully...",
    user,
    token,
  });
});

module.exports = authRouter;
