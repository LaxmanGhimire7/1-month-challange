const jwt = require("jsonwebtoken")

const identifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "User is not authorized to create a post",
    });
  }

  let currentUser;
  try {
    currentUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  req.user = currentUser;
  next();
  // console.log(req.body, req.file)
  // console.log(currentUser)
};

module.exports = identifyUser;
