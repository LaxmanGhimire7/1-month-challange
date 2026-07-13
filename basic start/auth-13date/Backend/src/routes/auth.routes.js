const express = require("express");
const userModel = require("../model/user.model");

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
  res.status(201).json({
    message: "User registerd successfully...",
    user,
  });
});

module.exports = authRouter;
