const mongoose = require("mongoose");



const userSchema = mongoose.Schema({
userName:{
    type: String,
    required: true,
},
email:{
    type: String,
    unique: true,
    required:true
},
country:{
    type: String,
    required: true,
},
age:{
    type: Number,
    required: true,
}
})

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;