const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    required: [true, "image is required to create an post"],
  },
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is required to create a post"],
  },
});

module.exports = postModel = mongoose.model("posts", postSchema);
