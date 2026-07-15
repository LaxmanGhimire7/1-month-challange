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
    user:{
        username:user.username,
        email:user.email,
        bio:user.bio,
        profileImage:user.profileImage

    },
    token,
  });
});

module.exports = authRouter;
