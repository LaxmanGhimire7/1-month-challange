const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


const followUserController = async(req,res)=>{

// extracting the username of both jasle follow gardai xa rw jaslai follow gardai xa
  const followerUsername = req.user.userName
  const followeeUsername = req.params.username

// user exist garxa ki nai herne
const isFolloweeExists = await userModel.findOne({
      userName: followeeUsername
})
if(!isFolloweeExists){
  return res.status(409).json({
    message:"The person u r trying to follow doesnot exists"
  })
}

// afule afu lai follow garna na dinye
if(followerUsername === followeeUsername){
  return res.status(409).json({
    message:"You cannot follow yourself"
  })
}

// already follow gareko xa ki nai herne
const isAlreadyFollowing = await followModel.findOne({
  follower: followerUsername,
  followee: followeeUsername
})
if(isAlreadyFollowing){
  return res.status(409).json({
    message:`You are already following ${followeeUsername}`
  })
}

// response
const followRecord = await followModel.create({
  follower:followerUsername,
  followee: followeeUsername
})
return res.status(201).json({
  message:"FOLLOW RECORD",
  followRecord
})

}


module.exports = {followUserController}