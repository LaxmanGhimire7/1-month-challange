// server config and start garna
const express = require("express");
const app = express();
const authRouter = require("./Routes/auth.route")


// middleware
app.use(express.json());


//api
app.use("/api/auth", authRouter)



module.exports = app;