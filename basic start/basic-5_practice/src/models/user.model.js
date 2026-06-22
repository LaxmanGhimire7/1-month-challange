const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  age: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  country: { type: String, required: true },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
