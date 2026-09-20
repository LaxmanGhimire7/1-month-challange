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
    folder: "/llkk",
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

const getPostController = async(req,res)=>{
    const userId = req.user.id;
    console.log(userId)
   const posts = await postModel.find({user:userId});
//    console.log(posts)
res.status(200).json({
    message:"Posts fetched successfully",
    posts
})
}

const getPostDetailsController = async(req,res)=>{
 const postId = req.params.postId;
 const userId = req.user.id;

 const postDetail = await postModel.findById(postId)
//  console.log(postDetail)
if(!postDetail){
    return res.status(404).json({
        message:"Post not found"
    })
}

const isValidUser = postDetail.user.toString() === userId;
if(!isValidUser){
    return res.status(401).json({
        message:"Forbidden content"
    })
}
res.status(200).json({
    message:"Post detail fetched successfully",
    postDetail
})
}

module.exports = { createPostController, getPostController,getPostDetailsController };
