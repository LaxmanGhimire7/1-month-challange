const mongoose = require("mongoose");

const connectToDb = () =>{
    mongoose.connect("mongodb+srv://lakxh-practice:IHfSZ6GKXA2m0QOZ@cluster0.qs1wzl6.mongodb.net/basic-practice5")
    .then(()=>{
        console.log("Connected to Db....")
    })
}

module.exports = connectToDb;