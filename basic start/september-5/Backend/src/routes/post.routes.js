const express = require("express")
const {createPostController, getPostController} = require("../controllers/post.controller")
const identifyUser = require("../middlewares/auth.middleware")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()

postRouter.post("/",upload.single("image"), identifyUser, createPostController)
postRouter.get("/", identifyUser, getPostController)

module.exports = postRouter;