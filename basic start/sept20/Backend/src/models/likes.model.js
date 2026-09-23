const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post is required to like the post "],
    },
    user: {
      type: String,
      required: [true, "User is required to like the post"],
    },
  },
  { timestamps: true },
);

likeSchema.index({ post: 1, user: 1 }, { unique: true });

module.exports = likeModel = mongoose.model("likes", likeSchema);
