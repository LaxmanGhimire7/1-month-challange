const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({

follower:{
    required: true,
    ref:"users",
    type:mongoose.Schema.Types.ObjectId
},
followee:{
    require:true,
    ref:"users",
    type:mongoose.Schema.Types.ObjectId
}
})

module.exports = followModel = mongoose.model("follows", followSchema)