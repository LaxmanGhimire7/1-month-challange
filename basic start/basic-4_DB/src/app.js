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
 * DELETE -> id = req.params.id
 */
app.delete("/api/user/:id", async (req, res) => {
  const id = req.params.id;
  await userModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "User deleted successfully",
  });
});

/**
 * UPDATE -> req.params.id
 */
app.patch("/api/user/:id",async(req,res)=>{
    const id = req.params.id;
    const {age} = req.body;
    await userModel.findByIdAndUpdate(id, {age})
    res.status(200).json({
        message:"User updaated successfully"
    })
})

module.exports = app;
