const express = require("express");
const {createPostController} = require("../controller/post.controller");
const multer = require("multer");
const uploads = multer({storage:multer.memoryStorage()})

const postRouter = express.Router();


postRouter.post("/",uploads.single("image"), createPostController)

module.exports = postRouter;