const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
