const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources/index.js");
const jwt = require("jsonwebtoken");
const postModel = require("../model/post.model");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  //   console.log(req.body, req.file);

  const token = req.cookies.token; // to extract token
  //   console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
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

  console.log(decoded);

  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "hii",
    folder: "cohort-2-instaclone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url, // this because in response the data is there url: so just taking that part ans storing it in imageUrl
    users: decoded.id,
  });
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

// get -> all data created by user
const getPostController = async (req, res) => {
  const token = req.cookies.token;

  let decodedData = null;
  try {
    decodedData = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
  // console.log(decodedData)
  const userId = decodedData.id;

const posts = await postModel.find({users:userId})
// console.log(posts)
res.status(200).json({
  message:"Post fetched successfully...",
  posts
})
};



module.exports = {
  createPostController,
  getPostController,
};
