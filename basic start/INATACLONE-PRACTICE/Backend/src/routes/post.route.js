const express = require("express")
const postRouter = express.Router()
const {createPostController} = require("../controllers/post.controller")


/*
POST /api/posts [protected]
req.body = {caption, imagefile}
*/
postRouter.post("/", createPostController)

module.exports = postRouter;