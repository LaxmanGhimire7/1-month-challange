const express = require("express")
const {userRegisterController} = require("../controllers/auth.controller");

const authRouter = express.Router();


authRouter.post("/register",userRegisterController)


module.exports = authRouter;