const router = require("express").Router();
const Categories = require("../../models/Categories");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

router.post('/',(req, res, next)=>{
    try {
        let details = new Categories();
        if(req.body.category!==null){
            details.category = req.body.category;
        }
        if(req.body.isInsulated!==null){
            details.isInsulated=req.body.isInsulated;
        }
        if(req.body.isElectricity!==null){
            details.isElectricity=req.body.isElectricity;
        }
        if(req.body.isAlarm!==null){
            details.isAlarm=req.body.isAlarm;
        }
        if(req.body.isSurveillance!==null){
            details.isSurveillance=req.body.isSurveillance;
        }
        if(req.body.isWashingArea!==null){
            details.isWashingArea=req.body.isWashingArea;
        }
        if(req.body.isBathroom!==null){
            details.isBathroom=req.body.isBathroom;
        }
        if(req.body.isPaymentOnHeat!==null){
            details.isPaymentOnHeat=req.body.isPaymentOnHeat;
        }
        if(req.body.isPaymentOnWater!==null){
            details.isPaymentOnWater=req.body.isPaymentOnWater;
        }
        if(req.body.isSeperateEnterance!==null){
            details.isSeperateEnterance=req.body.isSeperateEnterance;
        }
        if(req.body.isSecurityDeposit!==null){
            details.isSecurityDeposit=req.body.isSecurityDeposit;
        }
        if(req.body.isPrepaidRent!==null){
            details.isPrepaidRent=req.body.isPrepaidRent;
        }
        details.save().then((result) => {
            if (!result) {
              next(new InternalServerErrorResponse("Error saving data", 500.0));
            } else {
              next(
                new OkResponse(
                  "Data saved successfully!",
                  200
                )
              );
            }
          });
    } catch (err) {
        next(new InternalServerErrorResponse("Error while inserting data"));
    }
})

module.exports = router;