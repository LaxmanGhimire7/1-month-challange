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
      message: "User with this email or username not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  // console.log(token)
  res.status(200).json({
    message: "Login successful",
    user: {
      userName:user.userName,
      email:user.email,
      profileImage:user.profileImage,
      bio:user.bio,
    },
    token,
  });
};

module.exports = { registerController, loginController };
