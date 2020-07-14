const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token == "null") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }
  req.userId = payload.subject;
  next();
};
