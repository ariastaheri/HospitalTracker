const jwt = require("jsonwebtoken");
require("dotenv").config();

const MESSAGE_UNAUTHORIZED = "Unauthorized request";

module.exports = function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
  let token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token == "null") {
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
  let payload = jwt.verify(token, process.env.SECRET_KEY);
  if (!payload) {
    console.log("unverified token");
    return res.status(401).json({
      authorized: false,
      message: MESSAGE_UNAUTHORIZED,
    });
  }
  req.userId = payload.subject;
  next();
};
