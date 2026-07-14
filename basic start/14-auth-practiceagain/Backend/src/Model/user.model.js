const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true
    },
    email:{
        required:true,
        unique:[true,"User already exists"],
        type:String
    },
    password:{
        required:true,
        type:String,
    }
})

module.exports = userModel = mongoose.model("users",userSchema)