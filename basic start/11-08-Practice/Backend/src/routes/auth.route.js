const express = require("express")
const {userRegisterController, loginController} = require("../controllers/auth.controller");

const authRouter = express.Router();


authRouter.post("/register",userRegisterController)
authRouter.post("/login",loginController)


module.exports = authRouter;