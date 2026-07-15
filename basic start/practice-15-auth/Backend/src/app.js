// server create and config garna
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const Router = require("./routes/auth.routes")

//middleware
app.use(express.json())
app.use(cookieParser())

//API
app.use("/api/auth", Router)




module.exports = app;