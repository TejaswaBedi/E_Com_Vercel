const express = require("express");
const { createUser, loginUser, checkAuth } = require("../controller/Auth");
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

exports.router = router;
