// server create and config garna

const express = require("express");
const userModel = require("./models/user.model")

//calling the express and stroting in variable app
const app = express();

//Middleware
app.use(express.json())

//Creating APIs
/**
 * POST -> req.body
 */
app.post("/api/register",async(req,res)=>{
    const {userName, age, email, country} = req.body;
    const user = await userModel.create({userName, age, email, country})
    res.status(200).json({
        message:"User registered successfully",
        user
    })
})

// GET -> 
app.get("/api/user",async(req,res)=>{
    const user = await userModel.find();
    res.status(200).json({
        message:"User fetched successfully...",
        user
    })
})


// Delete -> req.params...
app.delete("/api/user/:id",async(req,res)=>{
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"User deleted successfully"
    })
})

// Update -> req.params.id, req.body....
app.patch("/api/user/:id",async(req,res)=>{
    const id = req.params.id;
    const {age, country} = req.body;
    await userModel.findByIdAndUpdate(id, {age, country})
    res.status(200).json({
        message:"User updated successfully..."
    })
})





module.exports = app;