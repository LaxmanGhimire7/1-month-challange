const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email already exists"],
    required: [true, "email is required"],
  },
  profileImage: {
    type: String,
    default:
      "https://ik.imagekit.io/3wmfdkip4/istockphoto-1451587807-612x612.jpg?updatedAt=1784107585944",
  },
  bio: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

module.exports = userModel = mongoose.model("users", userSchema);
