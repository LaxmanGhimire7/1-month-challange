const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  //    console.log(req.body, req.file)
  const token = req.cookies.token;
  //    console.log(token)

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decodedUser;

  try {
    decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
  // console.log(decodedUser)
  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder:"againStarted"
  });
// console.log(response)

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url,
    users:decodedUser.id
  })

  res.status(201).json({
    message:"Post created successfully",
    post
  })
// console.log(decodedUser)
};

module.exports = {
  createPostController,
};
