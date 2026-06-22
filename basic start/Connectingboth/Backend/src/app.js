const express = require("express");
const userModel = require("./Models/user.model")
const app = express();

app.use(express.json())

//POST
app.post("/api/register",async(req,res)=>{
 const {userName, email, age,photo, country} = req.body;
 const user = await userModel.create({userName, email, age, photo, country});
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

//Delete -> req.params.id     
app.delete("/api/user/:id",async(req,res)=>{
    const id = req.params.id;
    await userModel.findByIdAndDelete(id)
    res.status(200).json({
        message:"User deleted successfully"
    })
})

//PATCH
app.patch("/api/user/:id",async(req,res)=>{
    const id = req.params.id;
    const {country, photo, age} = req.body;
    await userModel.findByIdAndUpdate(id, {country, photo, age})
    res.status(200).json({
        message:"User updated successfully"
    })
})





module.exports = app;