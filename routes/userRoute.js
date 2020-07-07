const express = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRouter = express.Router();

module.exports = userRouter;

userRouter.get("/", (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong",
        error: err,
      });
    });
});

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .exec()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong",
        error: err,
      });
    });
});

userRouter.delete("/:id", (req, res) => {
  const userId = req.params.id;
  Visit.findByIdAndRemove(userId)
    .exec()
    .then(() => {
      res.json("done");
    })
    .catch((err) => {
      res.json({
        message: "Something went wrong",
        error: err,
      });
    });
});

userRouter.post("/register", (req, res) => {
  let newUser = new User({
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    password: req.body.password,
    roles: req.body.role,
    status: req.body.status,
  });

  newUser.AddUser(newUser, (err, saved) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json(saved);
    }
  });
});

userRouter.post("/login", (req, res) => {
  let userData = req.body;

  User.findOne({ userId: userData.userId }, (err, user) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      if (!user) {
        res.json({
          success: false,
          message: "User ID not found!",
        });
      } else {
        bcrypt.compare(userData.password, user.password, (err, isMatch) => {
          if (err)
            res.json({
              success: false,
              message: err,
            });
          if (isMatch) {
            //JWT stuff here
            let token = jwt.sign(
              { subject: user._id },
              process.env.SECRET_KEY,
              { expiresIn: "7200s" }
            );

            res.json({
              success: true,
              token: token,
              currentUser: user._id,
              message: "Success!",
            });
          } else {
            res.json({
              success: false,
              message: "Incorrect password entered!",
            });
          }
        });
      }
    }
  });
});

userRouter.patch("/:id", (req, res) => {
  const userId = req.params.id;
  let reqBody = req.body;

  if (req.body.userId) {
    return res.json({
      error: "userID cannot be updated!",
    });
  }
  User.findOneAndUpdate(
    { _id: userId },
    { $set: reqBody },
    { returnOriginal: false }
  )
    .exec()
    .then((doc) => {
      return res.json({
        message: doc,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
});
