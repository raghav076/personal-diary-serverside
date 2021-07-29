const express = require("express");
const { requireSignin } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controller/auth");
const {
  validateSignupRequest,
  isSignupRequestValidated,
  validateSigninRequest,
  isSigninRequestValidated,
} = require("../../validators/auth");

const router = express.Router();

router.post("/signup", validateSignupRequest, isSignupRequestValidated, signup);
router.post("/signin", validateSigninRequest, isSigninRequestValidated, signin);
router.post("/signout", signout);
router.post("/profile", requireSignin, (req, res) =>
  res.status(200).json({ user: "Great!! You are already logged in!" })
);

module.exports = router;
