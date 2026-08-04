const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  //   console.log(req.body, req.file);
  const token = req.cookies.token;
  // console.log(token)

  if (!token) {
    return res.status(404).json({
      messafe: "Unautnorized access",
    });
  }

  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  // console.log(decoded)

  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "lakxh",
    folder: "practice",
  });
  //   console.log(response)
  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url,
    users: decoded.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

const getPostController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      message: "NOT FOUND",
    });
  }

  let decodedUser;
  try {
    decodedUser = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid access",
    });
  }
  //   console.log(decodedUser);
  const userId = decodedUser.id;
  // console.log(userId)

  const posts = await postModel.find({ users: userId });
  res.status(200).json({
    message: "Post fetched successfully...",
    posts,
  });
};

module.exports = { createPostController, getPostController };
