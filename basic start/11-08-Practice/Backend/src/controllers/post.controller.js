const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async(req, res) => {
  //    console.log(req.body, req.file)
  // console.log(req.cookies)
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
        message:"Unauthorized access"
    })
  }

  const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
  console.log(decodedUser)

  const response= await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'fileName',
});

const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url,
    user:decodedUser.user
})

res.status(201).json({
    message:"Post created successfully",
    post
})

};

module.exports = { createPostController };
