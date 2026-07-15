const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exists"],
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/3wmfdkip4/istockphoto-1451587807-612x612.jpg",
  },
});

module.exports = userModel = mongoose.model("users", userSchema);
