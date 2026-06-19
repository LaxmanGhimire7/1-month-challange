// server create garna
// server lai config garna

const express = require("express");
const userModel = require("./models/user.model");
const app = express();
app.use(express.json());

/**
 * POST -> {userName, age} = req.body;
 */
app.post("/api/user", async (req, res) => {
  const { userName, age } = req.body;
  const users = await userModel.create({ userName, age });
  res.status(201).json({
    message: "User created",
    users,
  });
});

// GET ->
app.get("/api/user", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({
    message: "Users fetched",
    users,
  });
});

/**
 * DELETE
 */
app.delete("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
});

module.exports = app;
