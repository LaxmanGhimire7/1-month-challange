const express = require("express")
const {createPostController, getAllPostController, getPostDetail} = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({storage:multer.memoryStorage()})

const postRouter = express.Router()

postRouter.post("/",upload.single("image"), createPostController)
postRouter.get("/", getAllPostController)
postRouter.get("/details/:postId", getPostDetail)


module.exports = postRouter