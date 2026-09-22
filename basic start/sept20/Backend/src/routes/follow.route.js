const identifyUser = require("../middlewares/auth.middleware")
const followController = require("../controllers/follow.controller")
const express = require("express")


const followRouter = express.Router();

followRouter.post("/follow/:username",identifyUser, followController.followUserController )
followRouter.post("/unfollow/:username",identifyUser, followController.unFollowUserController )


module.exports = followRouter;