const User = require("../models/userModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const sendMail = require("../utils/sendEmail");
const ErrorHandler = require("../utils/errorHandler");
const brcypt = require("bcryptjs");
const crypto = require("crypto");

// register user
exports.registerUser = catchAsyncError(async (req, res, next) => {});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {});

// logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {});

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {});

// delete user
exports.deleteUser = catchAsyncError(async (req, res, next) => {});

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {});

// add movie in watchList
exports.addMovie = catchAsyncError(async (req, res, next) => {});

// remove movie from watchlist
exports.removeMovie = catchAsyncError(async (req, res, next) => {});
