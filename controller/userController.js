const User = require("../model/userModel");

const { promisify } = require("util");
const { createJWTToken } = require("../utils");
const jwt = require("jsonwebtoken");

exports.signup = async function (req, res, next) {
  const newUser = await User.create(req.body);

  const token = createJWTToken(newUser._id);

  return res.status(201).json({
    status: "success",
    token,
    newUser,
  });
};

exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  const currUser = await User.findOne({ email: email });

  const isValidPassword = await currUser.comparePassword(
    password,
    currUser.password
  );

  if (!isValidPassword) {
    return res.status(401).json({
      status: "failed",
      message: "Please Provide Valid Email Or Password",
    });
  } else {
    const token = createJWTToken(currUser._id);
    return res.status(200).json({
      status: "success",
      token,
      message: "Logged in Successfully",
    });
  }
};

exports.protect = async function (req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(400).json({
      status: "failed",
      message: "you're not logged in",
    });

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  if (!freshUser)
    return res.status(400).json({
      status: "failed",
      message: "Token expires Please log in again",
    });

  req.userId = freshUser.id;

  next();
};
