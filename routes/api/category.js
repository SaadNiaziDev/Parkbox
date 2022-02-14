const router = require("express").Router();
const Categories = require("../../models/Categories");
const {
  createValidation,
  deleteValidation,
  validate,
} = require("../../validation/categories");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

router.post(
  "/create",
  auth.isToken,
  auth.isAdmin,
  createValidation,
  validate,
  (req, res, next) => {
    try {
      let details = new Categories();
      details.name = req.body.name;
      details.isInsulated = req.body.isInsulated;
      details.isElectricity = req.body.isElectricity;
      details.isAlarm = req.body.isAlarm;
      details.isSurveillance = req.body.isSurveillance;
      details.isWashingArea = req.body.isWashingArea;
      details.isPaymentOnHeat = req.body.isPaymentOnHeat;
      details.isPaymentOnWater = req.body.isPaymentOnWater;
      details.isSeperateEnterance = req.body.isSeperateEnterance;
      details.isSecurityDeposit = req.body.isSecurityDeposit;
      details.isPrepaidRent = req.body.isPrepaidRent;
      details.save().then((result) => {
        if (!result) {
          next(new InternalServerErrorResponse("Error saving data", 500.0));
        } else {
          next(new OkResponse("Data saved successfully!", 200));
        }
      });
    } catch (err) {
      next(new InternalServerErrorResponse("Error while inserting data"));
    }
  }
);

router.put("/update", auth.isToken, auth.isAdmin, (req, res, next) => {
  try {
    Categories.findOne({ name: req.body.name }, (err, data) => {
      if (data && !err) {
        if (req.body.isInsulated !== null) {
          data.isInsulated = req.body.isInsulated;
        }
        if (req.body.isElectricity !== null) {
          data.isElectricity = req.body.isElectricity;
        }
        if (req.body.isAlarm !== null) {
          data.isAlarm = req.body.isAlarm;
        }
        if (req.body.isSurveillance !== null) {
          data.isSurveillance = req.body.isSurveillance;
        }
        if (req.body.isWashingArea !== null) {
          data.isWashingArea = req.body.isWashingArea;
        }
        if (req.body.isPaymentOnHeat !== null) {
          data.isPaymentOnHeat = req.body.isPaymentOnHeat;
        }
        if (req.body.isPaymentOnWater !== null) {
          data.isPaymentOnWater = req.body.isPaymentOnWater;
        }
        if (req.body.isSeperateEnterance !== null) {
          data.isSeperateEnterance = req.body.isSeperateEnterance;
        }
        if (req.body.isSecurityDeposit !== null) {
          data.isSecurityDeposit = req.body.isSecurityDeposit;
        }
        if (req.body.isPrepaidRent !== null) {
          data.isPrepaidRent = req.body.isPrepaidRent;
        }
        data.save();
        next(new OkResponse("Data updated successfully!", 200));
      }
    });
  } catch (err) {
    next(new InternalServerErrorResponse("Error while updating data", 500.0));
  }
});

router.delete(
  "/delete",
  auth.isToken,
  auth.isAdmin,
  deleteValidation,
  validate,
  (req, res, next) => {
    Categories.findOne({ name: req.body.name }, (err, data) => {
      if (!err && data) {
        data.delete();
        next(new OkResponse("Category has been deleted"));
      } else {
        next(new BadRequestResponse(err));
      }
    });
  }
);
router.get("/showAll", auth.isToken, (req, res, next) => {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit ||2,
  };



  Category.paginate({}, options, (err, results) => {
    if (!err && results) {
      next(new OkResponse(results));
    } else {
      next(new BadRequestResponse("Failed to paginate results"));
    }
  });
});

module.exports = router;
