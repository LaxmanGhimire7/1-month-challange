const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, bio, imageUrl, password } = req.body;
  console.log(req.body);
  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message:
        isUserExists.email == email
          ? "Email alreay used"
          : "Username already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  //   console.log(hash)

  const user = await userModel.create({
    username,
    email,
    bio,
    imageUrl,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  // console.log(token)
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      username,
      email,
      bio,
      imageUrl,
    },
    token,
  });
};

// Login
const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Invalid Passowrd",
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
  res.cookie("token", token)
  res.status(200).json({
    message:"User login successful",
    user,
    token
  })
};

module.exports = { registerController, loginController };
