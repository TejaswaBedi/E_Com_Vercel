const express = require("express");
const {
  createUser,
  loginUser,
  checkAuth,
  resetPasswordRequest,
  resetPassword,
  logout,
} = require("../controller/Auth");
const passport = require("passport");
const router = express.Router();

router.post("/signup", createUser);
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  loginUser
);
router.get("/check", passport.authenticate("jwt"), checkAuth);
router.get("/logout", logout);
router.post("/reset-password-request", resetPasswordRequest);
router.post("/reset-password", resetPassword);

exports.router = router;
