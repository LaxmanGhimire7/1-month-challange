const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { userName, email, password, bio, profilePicture } = req.body;
  // console.log(req.body)
  const isUserAlreadyRegistered = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (isUserAlreadyRegistered) {
    return res.status(409).json({
      message:
        isUserAlreadyRegistered.email === email
          ? "user with this email already exists"
          : "user with this username already exists",
    });
  }

  //Password hashing
  const passwordHash = await bcrypt.hash(password, 10);
  //   console.log(passwordHash)
  const user = await userModel.create({
    userName,
    email,
    password: passwordHash,
    bio,
    profilePicture,
  });
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
    message: "User registered successfully",
    user: {
      userName: user.userName,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
    token,
  });
};

module.exports = { registerController };
