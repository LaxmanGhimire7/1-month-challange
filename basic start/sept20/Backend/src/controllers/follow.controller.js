const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

const followUserController = async (req, res) => {
  const followerUsername = req.user.userName;
  const followeeUsername = req.params.username;
  // console.log(followeeUsername, followerUsername)

  const isFolloweeExist = await userModel.findOne({
    userName: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(409).json({
      message: "The person u r trying to follow is not available",
    });
  }
  // Avoiding to follow ourself
  if (followerUsername === followeeUsername) {
    return res.status(200).json({
      message: "You cannot follow yourself",
    });
  }

  //i should not be able to follow anyone twice
  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });
  if (isAlreadyFollowing) {
    return res.status(409).json({
      message: `You are arleady following ${followeeUsername}`,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    followRecord,
  });
};

const unFollowUserController = async(req,res)=>{
    const followerUsername = req.user.userName
    const followeeUserName = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUserName
    })
    if(!isUserFollowing){
        return res.status(409).json({
            message:"You are not following this user"
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)
    return res.status(200).json({
        message:`You unfollowed ${followeeUserName} successfully`
    })
}

module.exports = { followUserController, unFollowUserController };
