const { check, validationResult } = require("express-validator");
const { BadRequestResponse } = require("express-http-response");

const propertyValidation=[
    check("category").not().isEmpty(),
    check("price").not().isEmpty(),
    check("address").not().isEmpty(),
    check("zipcode").not().isEmpty(),
    check("description").not().isEmpty(),
    check("beds").not().isEmpty(),
    check("baths").not().isEmpty(),
    check("area").not().isEmpty(),
    check("isElectricity").not().isEmpty(),
    check("isSeperateEnterance").not().isEmpty(),
    check("isInsulated").not().isEmpty(),
    check("location").not().isEmpty(),
]

const validate = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("hello");
      next(new BadRequestResponse("Missing required parameters"));
    } else {
      next();
    }
};

module.exports = {propertyValidation,validate}