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
      folder:"cohort-2-instaclone"
    });

    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl:response.url,
        users:decoded.id
    })
    res.status(201).json({
        message:"Post created successfully",
        post
    })
};

module.exports = {
  createPostController,
};
