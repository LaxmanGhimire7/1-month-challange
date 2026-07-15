const express = require("express");
const authRouter = require("./routes/auth.route")
const cookieParser = require("cookie-parser")

const app = express();
//Middleware 
app.use(express.json());
app.use(cookieParser())

//API
app.use("/api/auth", authRouter)

module.exports = app;