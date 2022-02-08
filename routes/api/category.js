const router = require("express").Router();
const Categories = require("../../models/Categories");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

router.post("/create", (req, res, next) => {
  try {
    let details = new Categories();
    if (req.body.category !== null) {
      details.category = req.body.category;
    }
    if (req.body.isInsulated !== null) {
      details.isInsulated = req.body.isInsulated;
    }
    if (req.body.isElectricity !== null) {
      details.isElectricity = req.body.isElectricity;
    }
    if (req.body.isAlarm !== null) {
      details.isAlarm = req.body.isAlarm;
    }
    if (req.body.isSurveillance !== null) {
      details.isSurveillance = req.body.isSurveillance;
    }
    if (req.body.isWashingArea !== null) {
      details.isWashingArea = req.body.isWashingArea;
    }
    if (req.body.isPaymentOnHeat !== null) {
      details.isPaymentOnHeat = req.body.isPaymentOnHeat;
    }
    if (req.body.isPaymentOnWater !== null) {
      details.isPaymentOnWater = req.body.isPaymentOnWater;
    }
    if (req.body.isSeperateEnterance !== null) {
      details.isSeperateEnterance = req.body.isSeperateEnterance;
    }
    if (req.body.isSecurityDeposit !== null) {
      details.isSecurityDeposit = req.body.isSecurityDeposit;
    }
    if (req.body.isPrepaidRent !== null) {
      details.isPrepaidRent = req.body.isPrepaidRent;
    }
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
});

router.put("/update", (req, res, next) => {
  try {
    Categories.findOne({ category: req.body.category }, (err, data) => {
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

router.delete('/delete',(req, res, next)=>{
    Categories.findOne({category: req.body.category},(err,data)=>{
        if(!err && data){
            data.delete();
            next(new OkResponse("Category has been deleted"));
        }else{
            next(new BadRequestResponse(err));
        }
    })
})
router.get("/showAll", (req, res, next) => {
  Categories.find({}, { category: 1, _id: 0 })
    .populate()
    .then((data) => {
      next(new OkResponse(data));
    });
});

module.exports = router;
