const User = require("../models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendMail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler");
const brcypt = require("bcryptjs");
const crypto = require("crypto");

// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, gender } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    gender,
  });
  try {
    const message = `Welcome ${name},\nWelcome to MovieDB. You are now member of this family.\n\nMovieDB Admin`;
    await sendMail({ email, subject: "Welcome to MovieDB", message });
  } catch (error) {
    console.log("error sending email");
  }
  const token = user.getJWTToken();
  res.status(201).json({ success: true, token, user });
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }
  const isMatch = await brcypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid Credentials", 400));
  }
  const token = user.getJWTToken();
  res
    .status(200)
    .json({ success: true, token, user, message: "Login Successful" });
});

// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .json({ success: true, user: null, message: "Logout Successful" });
});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json({ success: true, user });
});

// delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).json({ success: true, user: null, message: "User Deleted" });
});

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("No user found with this email", 400));
  }
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/reset/password/${resetToken}`;
  const resetPasswordUrl = `http://localhost:3000/reset/password/${resetToken}`;
  try {
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password.\nPlease make a PUT request to ${resetPasswordUrl} to reset your password.\n\nMovieDB Admin`;
    await sendMail({ email, subject: "Reset Password", message });
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.log("error sending email");
    return next(new ErrorHandler("Error sending email", 500));
  }
});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password Token is either invalid or expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});

// add movie in watchList
exports.addMovie = catchAsyncError(async (req, res, next) => {
  const { movieId } = req.body;
  if (req.user.watchList.includes(movieId)) {
    return next(new ErrorHandler("Movie already in watchList", 400));
  }
  req.user.watchList.push(movieId);
  await req.user.save();
  res.status(200).json({
    success: true,
    message: "Movie added to watchList",
    watchList: req.user.watchList,
    count: req.user.watchList.length,
  });
});

// remove movie from watchlist
exports.removeMovie = catchAsyncError(async (req, res, next) => {
  const { movieId } = req.body;
  if (!req.user.watchList.includes(movieId)) {
    return next(new ErrorHandler("Movie not in watchList", 400));
  }
  req.user.watchList = req.user.watchList.filter((id) => id !== movieId);
  await req.user.save();
  res.status(200).json({
    success: true,
    message: "Movie removed from watchList",
    watchList: req.user.watchList,
    count: req.user.watchList.length,
  });
});
