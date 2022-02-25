const router = require("express").Router();
const Properties = require("../../models/Properties");
const Categories = require("../../models/Categories");
const Boost = require("../../models/Boost");
const paginate = require("mongoose-paginate-v2");
const {
  propertyValidation,
  validate
} = require("../../validation/properties");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");
const User = require("../../models/User");

router.post(
  "/add",
  auth.isToken,
  auth.limit,
  propertyValidation,
  validate,
  (req, res, next) => {
    let property = new Properties();
    try {
      Categories.findOne({
          category: req.body.category,
        },
        (err, data) => {
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
          property.user = req.user.id; ///////////////////////////////////
          property.location = req.body.location;
          property.expiryDate = Date.now() + 300000; //5 minutes -test case//
          User.findOne({
              _id: req.user.id,
            },
            (err, user) => {
              user.package.no_of_posts = user.package.no_of_posts + 1;
              user.save();
            }
          );
          property.boost.duration = req.body.boost.duration;
          property.boost.price = req.body.boost.price;
          property.boost.expires =
            Date.now() + +req.body.boost.duration * 86400000;
          property.save();
          next(new OkResponse(property));
        }
      );
    } catch (err) {
      next(new InternalServerErrorResponse(err));
    }
  }
);

router.put("/update/:propertyId", auth.isToken, (req, res, next) => {
  Properties.findById({
      _id: req.params.propertyId,
    },
    (err, data) => {
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
    }
  );
});

router.delete("/delete", auth.isToken, auth.isAdmin, (req, res, next) => {
  Properties.findById({
      _id: req.query.id,
    },
    (err, data) => {
      if (!err && data) {
        data.remove();
        next(new OkResponse("Data has been removed successfully"));
      } else {
        next(
          new BadRequestResponse(
            "UnExpected error occurred while processing request"
          )
        );
      }
    }
  );
});

router.get("/showAll", auth.isToken, async (req, res, next) => {
  //category //user //zipcode //price range
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit || 2,
    populate: {
      path: "category user",
    },
  };
  var query = {};
  if (
    typeof req.query.category !== "undefined" &&
    req.query.category !== null &&
    req.query.category &&
    req.query.category.length != 0
  ) {
    const categories = await Categories.find({
        name: req.query.category,
      })
      .select("_id")
      .exec();
    query.category = {
      $in: categories,
    };
  }
  if (
    typeof req.query.zipcode !== "undefined" &&
    req.query.zipcode !== null &&
    req.query.zipcode
  ) {
    query.zipcode = req.query.zipcode;
  }
  if (
    typeof req.query.user !== "undefined" &&
    req.query.user !== null &&
    req.query.user
  ) {
    const users = await User.find({
      _id: req.query.user,
    }).select("_id");
    query.user = users;
  } else {
    //query.user = req.user.id;
  }
  if (
    typeof req.query.minPrice !== "undefined" &&
    req.query.minPrice !== null &&
    req.query.minPrice &&
    typeof req.query.maxPrice !== "undefined" &&
    req.query.maxPrice !== null &&
    req.query.maxPrice
  ) {
    query.price = {
      $gte: req.query.minPrice,
      $lte: req.query.maxPrice,
    };
  }
  if (
    typeof req.query.latitude !== "undefined" &&
    req.query.latitude !== null &&
    req.query.latitude &&
    typeof req.query.longitude !== "undefined" &&
    req.query.longitude !== null &&
    req.query.longitude
  ) {
    const longitude = parseFloat(req.query.longitude);
    const latitude = parseFloat(req.query.latitude);
    loc = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: 1000 * (req.query.distance ? parseInt(req.query.distance) : 1), // searching within km's
        $minDistance: 0,
      },
    };

    if (loc) {
      query.location = loc;
    }
  }
  Properties.find(query)
    .sort({
      "boost.duration": -1,
    })
    .limit(options.limit)
    .skip(options.limit * (options.page - 1))
    .exec((err, results) => {
      if (err) {
        next(new BadRequestResponse("Something went wrong"));
      }
      Properties.count(query).exec((err, docs) => {
        if (err) {
          next(new BadRequestResponse("Something unknown Happened"));
        }
        next(
          new OkResponse({
            total: docs,
            page: options.page,
            pageSize: docs.length,
            data: results,
          })
        );
      });
    });
});

router.get("/showProperties/", async (req, res, next) => {
  var show = [];
  var result = await Categories.find({});
  for (var i = 0; i < result.length; i++) {
    let p = await Properties.find({
      category: result[i]._id,
    });
    const sliced = Object.fromEntries(
      //this code is slicing the object to give 10 results only for each category
      Object.entries(p).slice(0, 10)
    );
    show.push(sliced);
  }
  next(new OkResponse(show));
});

router.get("/category/:id", async (req, res, next) => {
  Properties.find({
      category: req.params.id,
    },
    (err, data) => {
      if (!err && data) {
        next(new OkResponse(data));
      } else {
        next(new BadRequestResponse(err));
      }
    }
  );
});

router.get("/showNearby/:longitude/:latitude", (req, res, next) => {
  var distance = parseFloat(req.query.distance); //in kilometers
  console.log(distance);
  Properties.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [req.params.longitude, req.params.latitude],
          },
          $maxDistance: 1000 * distance, // searching within km's
          $minDistance: 0,
        },
      },
    },
    (err, data) => {
      if (!err && data) {
        console.log("Properties shown");
        next(new OkResponse(data));
      } else {
        console.log("Error occurred");
        next(new BadRequestResponse("Sorry, could not find properties"));
      }
    }
  );
});

router.get(
  "/updateBooster/:PropertyId/:BoosterId",
  auth.isToken,
  async (req, res, next) => {
    try {
      Properties.findOne({
          _id: req.params.PropertyId,
        },
        (err, property) => {
          if (!err && property) {
            Boost.findOne({
                _id: req.params.BoosterId,
              },
              (err, booster) => {
                if (!err && booster) {
                  property.boost.duration = booster.no_of_days;
                  property.boost.price = booster.price;
                  property.boost.expires = (Date.now() + (parseInt(property.boost.expires) * 86400000));
                  property.save();
                  next(new OkResponse("Booster updated successfully!"));
                } else {
                  next(new BadRequestResponse("Sorry, could not find booster"));
                }
              }
            );
          } else {
            next(new BadRequestResponse("Sorrt, could not find property"));
          }
        }
      );
    } catch (err) {
      next(new BadRequestResponse("Sorry, could not process request"));
    }
  }
);

module.exports = router;