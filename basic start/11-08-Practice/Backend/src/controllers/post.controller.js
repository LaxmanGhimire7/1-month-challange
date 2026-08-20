const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const createPostController = async (req, res) => {
  //    console.log(req.body, req.file)
  // console.log(req.cookies)
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  //   console.log(decodedUser)
  let decodedUser;
  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: response.url,
    user: decodedUser.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};


//
const getAllPostController = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decodedUser;
  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
//   console.log(decodedUser)

  const userId = decodedUser.id;
//   console.log(userId)
const posts = await postModel.find({user:userId})
// console.log(posts)
res.status(200).json({
    message:"Posts fetched successfully...",
    posts
})
};


const getPostDetail = async(req,res)=>{
 const token = req.cookies.token;

 if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decodedUser;
  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  const userId = decodedUser.id;
  const postId = req.params.postId;
//   console.log(postId)

const post = await postModel.findById(postId);

if(!post){
    return res.status(404).json({
        message:"post not found"
    })
}

const isValidUser = post.user.toString() === userId
 if(!isValidUser){
    return res.status(403).json({
      message: "forbidden content"
    })
  }

  return res.status(200).json({
    message:"Post detail fetched successfully",
    post
  })


}

module.exports = { createPostController, getAllPostController,getPostDetail };
