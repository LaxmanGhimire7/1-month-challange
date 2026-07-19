const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model");
const jwt = require("jsonwebtoken")

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

const createPostController = async (req, res) => {
  // console.log(req.body, req.file);

  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
      message:"Unauthorized access"
    })
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    res.status(404).json({
      message: "User not found"
    })
  }
  // console.log(decoded)

  const response = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer),'file'),
    fileName:'lakxh',
    folder:'practice-1'
  })
// res.send(response)

const post = await postModel.create({
  caption: req.body.caption,
  imageUrl: response.url,
  user: decoded.id
})
res.status(201).json({
  message:"Post created successfully",
  post
})

};



//Get -> all post of user
const getPostController = async(req,res)=>{
  const token = req.cookies.token
  if(!token){
    return res.status(401).json({
    message:"Unauthorized access"
    })
  }


  let decodedUserData;
  try {
    decodedUserData = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    })
  }


  const post = await postModel.find({user:decodedUserData.id})
  res.status(200).json({
    message:"User fetched successfully",
    post
  })
}



// POST DETAIL -> token, user data, postid, userid
const getPostDetailController = async(req,res)=>{
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
      message: "Unauthorized access"
    })
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    })
  }

  const userId = decoded.id;
  const postId= req.params.postId;
  // console.log(userId)
  // console.log(postId)

  const post = await postModel.findById(postId)
  if(!post){
    return res.status(404).json({
      message: "Post not found"
    })
  }

  const isValidUser = post.user.toString() === userId;
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

module.exports = {
  createPostController,getPostController,getPostDetailController
};
