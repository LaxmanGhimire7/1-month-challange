const jwt = require("jsonwebtoken")

async function identifyUser(req, res, next) {
     const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  //   console.log(decodedUser)
  let decodedUser;
  try {
    decodedUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = decodedUser;
  next();
}

module.exports = identifyUser;