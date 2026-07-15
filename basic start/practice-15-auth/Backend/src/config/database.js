const mongoose = require("mongoose");

const connectToDb = async() =>{
   await mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log("Connected to MongoDb")
   })
}

module.exports = connectToDb