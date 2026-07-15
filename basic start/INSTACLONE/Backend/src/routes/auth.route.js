const express = require("express");
const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserALreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserALreadyExists) {
    return res.status(409).json({
      message:
        "User already exists: " +
        (isUserALreadyExists.email === email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  //hashed password
  const hash = crypto.createHash("md5").update(password).digest("hex");

  //user create
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  //Token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "User created successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
    token,
  });
});

//Login
authRouter.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [
      {
        /*
        conditions: if username bata login garye yo linxa email undefined aauxa so yo matra chalxa 
        */
        username: username,
      },
      {
        /*
        conditions: if email provide garyo vanye yo chalxa username wala condition undefined==false soo tyo chaldaina
        */
        email: email,
      },
    ],
  });

  if(!user){
    return res.status(404).json({
        message: "User not found"
    })
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const isPasswordValid = hash == user.password;
  if(!isPasswordValid){
    return res.status(401).json({
        message: "Invalid password"
    })
  }

  const token = jwt.sign({
    id:user._id,
    email:user.email,
  },
process.env.JWT_SECRET,{expiresIn:"1d"})

res.cookie("token", token)
res.status(200).json({
    message: "User login successful",
    user:{
        username: user.username,
        email: user.email,
        bio:user.bio,
        profileImage:user.profileImage
    },
    token
})
});

module.exports = authRouter;
