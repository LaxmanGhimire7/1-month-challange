const express = require("express")
const {createPostController, getAllPostController, getPostDetail} = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

const postRouter = express.Router()

postRouter.post("/",upload.single("image"),identifyUser, createPostController)
postRouter.get("/",identifyUser, getAllPostController)
postRouter.get("/details/:postId",identifyUser, getPostDetail)


module.exports = postRouter