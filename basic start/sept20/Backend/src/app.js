const express = require("express");
const cookieParser = require("cookie-parser")
const app = express()

//middleware to read data from body
app.use(express.json())
app.use(cookieParser())

// requiring routes
const authRouter = require("../src/routes/auth.routes")
const postRouter = require("../src/routes/post.routes")
const followRouter = require("./routes/follow.route")

//using routes //API
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", followRouter)



module.exports = app;