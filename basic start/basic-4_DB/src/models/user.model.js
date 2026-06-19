const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: String,
    age: Number
    
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;