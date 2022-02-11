const router = require("express").Router();
const Properties = require("../../models/Properties");
const Categories = require("../../models/Categories");
const { propertyValidation, validate } = require("../../validation/properties");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

router.post(
  "/add",
  auth.isToken,
  propertyValidation,
  validate,
  (req, res, next) => {
    let property = new Properties();
    try {
      Categories.findOne({ category: req.body.category }, (err, data) => {
        property.category = data._id;
        property.price = req.body.price;
        property.image = req.body.image;
        property.address = req.body.address;
        property.description = req.body.description;
        property.beds = req.body.beds;
        property.baths = req.body.baths;
        property.area = req.body.area;
        property.isInsulated = req.body.isInsulated;
        property.isElectricity = req.body.isElectricity;
        property.isSeperateEnterance = req.body.isSeperateEnterance;
        property.user = req.user.id;
        property.save();
        next(new OkResponse(property));
      });
    } catch (err) {
      next(new InternalServerErrorResponse(err));
    }
  }
);

router.put("/update/:propertyId", auth.isToken, (req, res, next) => {
  Properties.findById({ _id: req.params.propertyId }, (err, data) => {
    if (!err && data) {
      if (req.body.price) {
        data.price = req.body.price;
      }
      if (req.body.image) {
        data.image = req.body.image;
      }
      if (req.body.address) {
        data.address = req.body.address;
      }
      if (req.body.description) {
        data.description = req.body.description;
      }
      if (req.body.beds) {
        data.beds = req.body.beds;
      }
      if (req.body.baths) {
        data.baths = req.body.baths;
      }
      if (req.body.area) {
        data.area = req.body.area;
      }
      if (req.body.isElectricity) {
        data.isElectricity = req.body.isElectricity;
      }
      if (req.body.isSeperateEnterance) {
        data.isSeperateEnterance = req.body.isSeperateEnter;
      }
      if (req.body.isInsulated) {
        data.isInsulated = req.body.isInsulated;
      }
      data.save();
      next(new OkResponse(data));
    } else {
      next(new InternalServerErrorResponse("Failed to update data"));
    }
  });
});

router.delete("/delete",auth.isToken,auth.isAdmin, (req, res, next) => {
  Properties.findById({ _id: req.query.id }, (err, data) => {
    if (!err && data) {
      data.remove();
      next(new OkResponse("Data has been removed successfully"));
    } else {
      next(new BadRequestResponse("UnExpected error occurred while processing request"));
    }
  });
});

router.get("/showAll",auth.isToken, (req, res, next) => {       //  filtering data on bases of price and category using query/params
  Properties.find() 
    .populate("category user")
    .then((err, data) => {
      if (err) {
        next(err);
      } else {
        next(new OkResponse(data));
      }
    });
});

module.exports = router;
