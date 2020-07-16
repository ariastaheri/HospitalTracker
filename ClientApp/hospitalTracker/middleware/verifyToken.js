const jwt = require("jsonwebtoken");
require("dotenv").config();

const MESSAGE_UNAUTHORIZED = "Unauthorized request";

module.exports = function verifyToken(req, res, next) {
  console.log("starting...");
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
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      req.authorized = false;
    } else {
      req.authorized = true;
      req.userId = decoded.subject;
    }
  });
  next();
};
