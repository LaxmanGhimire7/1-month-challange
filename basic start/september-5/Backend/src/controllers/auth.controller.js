const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  //   console.log(req.body);
  const { userName, email, profileImage, password, bio } = req.body;

  const isAlreadyRegistered = await userModel.findOne({
    $or: [{ userName }, { email }],
  });
  if (isAlreadyRegistered) {
    return res.status(409).json({
      message:
        isAlreadyRegistered.email === email
          ? "User with this email already exists"
          : "User with this username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log(hashedPassword)
  const user = await userModel.create({
    userName,
    email,
    profileImage,
    password: hashedPassword,
    bio,
  });

  console.log(user);
  const token = jwt.sign(
    {
      _id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  //   console.log(token);
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully...",
    user: {
      userName,
      email,
      profileImage,
      bio,
    },
    token
  });
};

const loginController = (req, res) => {
    
};

module.exports = { registerController, loginController };
