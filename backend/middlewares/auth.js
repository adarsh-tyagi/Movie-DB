const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// authentication middleware
module.exports = catchAsyncError(async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new ErrorHandler("Please login to access the resource", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded._id });
  if (!user) {
    next(new ErrorHandler("Please login to access the resource", 400));
  }
  req.user = user;
  next();
});
