const { check, validationResult } = require("express-validator");
const { BadRequestResponse } = require("express-http-response");

const createValidation = [
  check("name").not().isEmpty(),
  check("isInsulated").not().isEmpty(),
  check("isElectricity").not().isEmpty(),
  check("isAlarm").not().isEmpty(),
  check("isSurveillance").not().isEmpty(),
  check("isWashingArea").not().isEmpty(),
  check("isPaymentOnHeat").not().isEmpty(),
  check("isPaymentOnWater").not().isEmpty(),
  check("isSeperateEnterance").not().isEmpty(),
  check("isSecurityDeposit").not().isEmpty(),
  check("isPrepaidRent").not().isEmpty(),
];

const deleteValidation = [check("name").not().isEmpty()];

const validate = function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("hello");
    next(new BadRequestResponse("Missing required parameters"));
  } else {
    next();
  }
};

module.exports = { createValidation, deleteValidation, validate };
