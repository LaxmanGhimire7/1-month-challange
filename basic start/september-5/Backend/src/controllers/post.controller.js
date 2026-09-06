const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  //   console.log(req.cookies)
 

  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
  });
  // console.log(response)

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url,
    users: req.user.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

const getPostController = async (req, res) => {
  const userId = req.user.id;
//   console.log(userId)
  const post = await postModel.find({users:userId})
  res.status(200).json({
    message:"Post fetched successfully",
    post
  })
};



module.exports = { createPostController, getPostController };
