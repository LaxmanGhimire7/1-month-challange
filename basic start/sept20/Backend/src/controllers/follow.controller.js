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

// if(isAlreadyFollowing){
//   return res.status(409).json({
//     message:`You are already following ${followeeUsername}`
//   })
// }

// if aba based on the enum logic lekhne like for pending, rejected and all
if(isAlreadyFollowing){

  //if maile already follow garisakeko vaye
  if(isAlreadyFollowing.status === "pending"){
    return res.status(409).json({
      message:`Follow request to ${followeeUsername} is pending`
    })
  }

  if(isAlreadyFollowing.status === "accepted"){
    return res.status(200).json({
      message:` You are already following ${followeeUsername} `
    })
  }

  // if reject vako xa vanye feri req pathauna dinye
  if(isAlreadyFollowing.status === "rejected"){
    isAlreadyFollowing.status = "pending"
    await isAlreadyFollowing.save()

      return res.status(200).json({
        message: `Follow request sent again to ${followeeUsername}`,
        followRecord: isAlreadyFollowing
      });
  }
}


// response
const followRecord = await followModel.create({
  follower:followerUsername,
  followee: followeeUsername,
  status:"pending"
})
return res.status(201).json({
  message:"FOLLOW RECORD",
  followRecord
})

}

const unFollowUserController = async(req,res)=>{
   const followerUsername = req.user.userName;
   const followeeUsername = req.params.username

   const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
   })

   if(!isUserFollowing){
    return res.status(409).json({
      message:`You are not following ${followeeUsername}`
    })
   }

   await followModel.findByIdAndDelete(isUserFollowing._id)
   return res.status(200).json({
    message:`You unfollowed ${followeeUsername} successfully`
   })
}


module.exports = {followUserController, unFollowUserController}