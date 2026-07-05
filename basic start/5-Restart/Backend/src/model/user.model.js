const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
name:{
    type: String,
    required: true,
},
email:{
    type: String,
    unique: true,
    required:true
}
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;