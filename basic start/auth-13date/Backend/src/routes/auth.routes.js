const express = require("express");
const userModel = require("../model/user.model");

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const user = userModel.create({ username, email, password });
  res.status(201).json({
    message: "User registerd successfully...",
  });
});

module.exports = authRouter;
