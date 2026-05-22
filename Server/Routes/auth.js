const express = require("express");

const router = express.Router();

const {
  registerUser,
  login,
  verifyOtp,
} = require("../Controller/authController");

const {
  registerValidation,
  loginValidation,
  validate,
} = require("../validations/authValidation");

router.post("/register", registerValidation, validate, registerUser);

router.post("/login", loginValidation, validate, login);

router.post("/verify-otp", verifyOtp);

module.exports = router;
