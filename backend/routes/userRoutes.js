const express = require("express");
const {
  registerUser,
  loginUser,
  deleteUser,
  logoutUser,
  getUserDetails,
  forgotPassword,
  resetPassword,
  addMovie,
  removeMovie,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(authMiddleware, logoutUser);
router
  .route("/")
  .get(authMiddleware, getUserDetails)
  .delete(authMiddleware, deleteUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);
router.route("/movie/add").post(authMiddleware, addMovie);
router.route("/movie/remove").post(authMiddleware, removeMovie);

module.exports = router;
