const express = require("express");
const {createPostController,getPostController} = require("../controller/post.controller");
const multer = require("multer");
const uploads = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();


postRouter.post("/",uploads.single("image"), createPostController)
postRouter.get("/", getPostController)

module.exports = postRouter;