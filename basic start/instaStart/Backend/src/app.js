const express = require("express")
const authRouter = require("../src/routes/auth.route")
const postRouter = require("../src/routes/post.route")
const cookieParser = require("cookie-parser")

const app = express();

//Middleware
app.use(express.json())
app.use(cookieParser())


//API Prefix
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)


module.exports = app;