const mongoose = require("mongoose");

const connectToDb = () =>{
    mongoose.connect()
    .then(()=>{
        console.log("Connected to Db....")
    })
}

module.exports = connectToDb