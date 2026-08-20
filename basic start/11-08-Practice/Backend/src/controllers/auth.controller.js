const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegisterController = async (req, res) => {
  const { userName, email, profileImage, password, bio } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ userName }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email === email
          ? "User with this email already exists"
          : "User with this username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    userName,
    email,
    profileImage,
    password: hashedPassword,
    bio,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );
  //   console.log(token);
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successful",
    user: {
      userName,
      email,
      profileImage,
      bio,
    },
  });
};

const loginController = async (req, res) => {
  const { userName, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ userName: userName }, { email: email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "Not Found",
    });
  }

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      user: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    user: {
      user: user.userName,
      email: user.email,
      bio: user.bio,
      userImage: user.userImage,
    },
    token,
  });
};

module.exports = { userRegisterController, loginController };
