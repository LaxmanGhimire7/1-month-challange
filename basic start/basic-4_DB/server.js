// server lai start garna
// database lai start garna
require("dotenv").config()
const { config } = require("dotenv")
const app = require("./src/app")
const connectToDb = require("./src/config/db")

connectToDb()



app.listen(3000,()=>{
    console.log("Server is listening on port 3000...")
})