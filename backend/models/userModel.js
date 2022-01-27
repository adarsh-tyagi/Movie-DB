const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// define user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    minlength: [3, "Name should be greater than 3 characters"],
    maxlength: [20, "Name should be less than 10 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User email is required"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Enter valid email id"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [6, "Password should be longer than 6 characters"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  watchList: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// generate JWT token for user
userSchema.methods.getJWTToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
};

// generate password reset token for user
userSchema.methods.getResetPasswordToken = async function () {
  const user = this;
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();
  return resetToken;
};

// encrypt user password before saving
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
