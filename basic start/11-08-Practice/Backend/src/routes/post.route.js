const express = require("express")
const {createPostController} = require("../controllers/post.controller")

const postRouter = express.Router()

postRouter.post("/",createPostController)


module.exports = postRouter