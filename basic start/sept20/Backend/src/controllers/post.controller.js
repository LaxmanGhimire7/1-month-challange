const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folderName: "llkk",
  });
  console.log(response);

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url,
    user: req.user.id,
  });
  return res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

module.exports = { createPostController };
