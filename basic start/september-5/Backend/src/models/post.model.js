const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        required:[true,"Image is required to create a post"],
        type:String
    },
    users:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User is required to create a post"]
    }
})

const postModel = mongoose.model("posts",postSchema)
module.exports = postModel;