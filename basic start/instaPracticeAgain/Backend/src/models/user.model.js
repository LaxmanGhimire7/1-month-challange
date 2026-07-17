const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        required:[true, "Username should be provided"],
        type: String,
        unique:[true, "Username already exists"]
    },
    email:{
        type:String,
        required:true,
        unique:[true, "Email already exists"]
    },
    bio:{
        type:String
    },
    imageUrl:{
        type:String,
        default:"https://ik.imagekit.io/3wmfdkip4/cohort-2-instaclone/hii_2qjiD3rGZ?updatedAt=1784221706737"
    },
    password:{
        type:String,
        required:[true, "Password must be created"]
    }
})
module.exports = userModel = mongoose.model("users",userSchema)