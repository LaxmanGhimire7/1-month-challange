const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = follwModel = mongoose.model("follows", followSchema);
