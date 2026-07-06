// to create and config

const express = require("express");
const app = express();
const userModel = require("./model/user.model")

//middleware
app.use(express.json())

//POST
app.post("/api/register", async(req, res) => {
  const{userName, email, country, age} = req.body;
  const user =await userModel.create({userName, email, country, age})

  res.status(201).json({
    message: "User registered successfully",
    user
  })
})



module.exports = app;