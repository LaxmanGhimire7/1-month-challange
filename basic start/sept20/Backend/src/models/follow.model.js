const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      required: true,
    },
    followee: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

followSchema.index({ follower: 1, following: 1 }, { unique: true })

module.exports = followModel = mongoose.model("follows", followSchema)
