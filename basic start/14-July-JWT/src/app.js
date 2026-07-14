// server config and start garna
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const authRouter = require("./Routes/auth.route")


// middleware
app.use(express.json());
app.use(cookieParser())

//api
app.use("/api/auth", authRouter)



module.exports = app;