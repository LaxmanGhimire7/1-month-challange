const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to Db...");
    })
    .catch((error) => {
      console.error("MongoDb connection failed:", error.message);
    });
};

module.exports = connectToDb;
