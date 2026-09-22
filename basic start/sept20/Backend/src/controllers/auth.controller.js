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
      userName: user.userName,
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

const loginController = async (req, res) => {
  const { userName, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ userName: userName }, { email: email }],
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({
      message: "Password not matched",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      userName: user.userName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful",
    user: {
      userName: user.userName,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    },
    token,
  });
};

module.exports = { registerController, loginController };
