// server start garna and db start garna
require("dotenv").config()
const app = require("./src/app");
const connectToDb = require("./src/Config/database");

//Database
connectToDb()







app.listen(3000,()=>{
    console.log("Server is running on port 3000...")
})