const express = require("express");
const userModel = require("./Models/user.model")
const app = express();

app.use(express.json())

//POST
app.post("/api/register",async(req,res)=>{
 const {userName, email, age, country} = req.body;
 const user = await userModel.create({userName, email, age,photo, country});
 res.status(201).json({
    message:"User registered successfully",
    user
 })
})

//GET 
app.get("/api/user",async(req,res)=>{
    const user = await userModel.find();
    res.status(200).json({
        message:"User fetched successfully",
        user
    })
})








module.exports = app;