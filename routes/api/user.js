const router = require("express").Router();
const User = require("../../models/User");
const {sendEmailVerificationOTP}= require("../../services/emailService");
const passport = require("passport");
const localStrategy = require("../../middleware/passport"); // importing strategy file
const {
  registerValidation,
  otpValidation,
  loginValidation,
  emailValidation,
  statusValidation,
  validate,
} = require("../../validation/user");
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

///initializing passport.js
passport.use(localStrategy);
router.use(passport.initialize());

router.post(
  "/register",
  registerValidation,
  validate,
  auth.isEmail,
  auth.isSame,
  (req, res, next) => {
    try {
      let newUser = new User();
      newUser.email = req.body.email.toLowerCase();
      newUser.fullname = req.body.fullname;
      newUser.setPassword(req.body.password);
      newUser.generateOTP();
      newUser.save().then((result) => {
        if (!result) {
          next(new InternalServerErrorResponse("Error saving user", 500.0));
        } else {
          console.log(result);
          sendEmailVerificationOTP(result);
          next(new OkResponse(result, "Data saved successfully!", 200));
        }
      });
    } catch (err) {
      console.log(err);
      next(new BadRequestResponse("Something Unknown Happened!.", 422.0));
    }
  }
);

router.post(
  "/login",
  loginValidation,
  validate,
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    User.findOne({ email: req.user.email }, (err, data) => {
      if (data.isEmailVerified === true && data.status === "active") {
        next(new OkResponse(data.toAuthJSON()));
      } else if (data.isEmailVerified === false) {
        next(new BadRequestResponse("Please Verify your email first!"));
      } else if (data.status === "inactive") {
        next(
          new BadRequestResponse(
            "Your account has been blocked temporarily due to inactivity."
          )
        );
      } else if (data.status === "deleted") {
        next(
          new BadRequestResponse(
            "Your account has been Suspended for lifetime period!"
          )
        );
      }
    });
  }
);

router.post(
  "/createAdmin",
  registerValidation,
  validate,
  auth.isToken,
  auth.isAdmin,
  auth.isEmail,
  auth.isSame,
  (req, res, next) => {
    try {
      let newUser = new User();
      newUser.email = req.body.email.toLowerCase();
      newUser.fullname = req.body.fullname;
      newUser.setPassword(req.body.password);
      newUser.generateOTP();
      newUser.role = 1;
      newUser.save().then((result) => {
        if (!result) {
          next(new InternalServerErrorResponse("Error saving user", 500.0));
        } else {
          next(
            new OkResponse(result.toAuthJSON(), "Data saved successfully!", 200)
          );
        }
      });
    } catch (err) {
      next(new BadRequestResponse(err));
    }
  }
);

router.post(
  "/verifyEmail",
  emailValidation,
  otpValidation,
  validate,
  (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!err && user) {
        if (
          user.otp === req.body.otp &&
          user.otp_expires.getTime() > Date.now()
        ) {
          user.otp = null;
          user.otp_expires = null;
          user.isEmailVerified = true;
          user.save();
          next(new OkResponse("Email is verified"));
        } else {
          next(new BadRequestResponse("Invalid OTP"));
        }
      } else {
        next(new BadRequestResponse(err));
      }
    });
  }
);

router.put("/deleteUser", emailValidation, validate,auth.isToken,auth.isAdmin, (req, res, next) => {      //www.example.com/api/user/deleteUser
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!err && user) {
      (user.status = "deleted"), user.save();
      next(new OkResponse("User deleted successfully"));
    } else {
      next(new BadRequestResponse("User not found"));
    }
  });
});

router.put(
  "/changeStatus",
  emailValidation,
  statusValidation,
  validate,
  auth.isToken,
  auth.isAdmin,
  (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!err && user) {
        user.status = req.body.status;
        user.save();
        next(new OkResponse("Status has been updated"));
      } else {
        next(new BadRequestResponse("User not found"));
      }
    });
  }
);

router.get("/showAll", auth.isToken, auth.isAdmin, (req, res, next) => {
  const options = {
    page: req.query.page || 1,
    limit: req.query.limit ||2,
  };



  User.paginate({}, options, (err, results) => {
    if (!err && results) {
      next(new OkResponse(results));
    } else {
      next(new BadRequestResponse("Failed to paginate results"));
    }
  });
});

module.exports = router;


