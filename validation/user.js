const { check, validationResult } = require("express-validator");
const { BadRequestResponse } = require("express-http-response");

const registerValidation = [
  check("fullname").not().isEmpty(),
  check("password").not().isEmpty(),
  check("email").not().isEmpty().isEmail().isLowercase(),
  check("rePassword").not().isEmpty(),
];

const loginValidation = [
  check("email").not().isEmpty().isEmail(),
  check("password").not().isEmpty(),
];

const otpValidation = [
  check("email").not().isEmpty().isEmail(),
  check("otp").not().isEmpty(),
];

const statusValidation = [
  check("email").not().isEmpty().isEmail(),
  check("status").not().isEmpty(),
];
const emailValidation = [check("email").not().isEmpty().isEmail()];

const validate = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("hello");
    next(new BadRequestResponse("Missing required parameters"));
  } else {
    next();
  }
};

module.exports = {
  registerValidation,
  otpValidation,
  loginValidation,
  emailValidation,
  statusValidation,
  validate,
};
