const express = require("express");
const userModel = require("../Models/user.model")

const authRouter = express.Router();

authRouter.post("/register",async(req,res)=>{
const {username, email, password} = req.body;

const user = await userModel.create({username, email, password});
res.status(201).json({
    message:"User registered successsfully...",
    user
})

})



module.exports = authRouter;