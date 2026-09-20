const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username already exists"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists"],
  },
  password: {
    required: true,
    type: String,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
    default:
      "https://ik.imagekit.io/3wmfdkip4/istockphoto-1451587807-612x612.jpg",
  },
});

module.exports = userModel = mongoose.model("users", userSchema);
