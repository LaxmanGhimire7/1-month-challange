const express = require("express");
const authRouter = require("../src/routes/auth.routes")
const postRouter = require("../src/routes/post.routes")
const cookieParser = require("cookie-parser")
const app = express()

//middleware to read data from body
app.use(express.json())
app.use(cookieParser())

//API
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)


module.exports = app;