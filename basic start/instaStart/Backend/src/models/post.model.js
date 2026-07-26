const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageUrl:{
        required:[true, "image is required to create a post"],
        type:String
    },
    users:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true, 'user id is required']

    }
})

module.exports = postModel = mongoose.model("posts",postSchema)