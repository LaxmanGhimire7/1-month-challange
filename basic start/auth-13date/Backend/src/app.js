const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())

//Routes and
app.use("/api/auth", authRoutes)

module.exports = app;