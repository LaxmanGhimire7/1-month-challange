const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        unique:true,
        type:String
    },
    password:{
        type:String
    }
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;