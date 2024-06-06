const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json("Token not found");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: " Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.log("Error");
    res.status(401).json({ error: " Invalid Token" });
  }
};

const generateToken = (userData) => {
  return jwt.sign({ userData }, process.env.JWT_SECRET);
};

module.exports = { jwtAuthMiddleware, generateToken };