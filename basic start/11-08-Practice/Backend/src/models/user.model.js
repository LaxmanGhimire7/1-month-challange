const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true, "username is required"],
        unique:[true,"username already exists"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true,"email already exists"]
    },
    profileImage:{
        default:"https://ik.imagekit.io/3wmfdkip4/lakxh_tS-LQOo4_?updatedAt=1784141737902",
        type:String,
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    bio:{
        type:String
    }
})

module.exports = userModel = mongoose.model("users",userSchema)