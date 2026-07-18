const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});


const createPostController = async (req, res) => {
//   console.log(req.body, req.file);

  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "lakxh",
    folder:"practice"
  });
//   console.log(response)
};

module.exports = { createPostController };
