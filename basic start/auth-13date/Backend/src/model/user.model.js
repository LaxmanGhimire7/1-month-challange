const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "With this email user already exists"],
  },
  password: {
    type: String,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
