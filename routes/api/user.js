const router = require("express").Router();
const User = require("../../models/User");
const passport = require('passport')
const localStrategy = require('../../middleware/passport') // importing strategy file
const auth = require("../../middleware/auth");
const {
  OkResponse,
  BadRequestResponse,
  InternalServerErrorResponse,
} = require("express-http-response");

///initializing passport.js
passport.use(localStrategy);
router.use(passport.initialize());

router.post("/register",auth.validate,auth.isEmail, auth.isSame, (req, res, next) => {
  try {
    let newUser = new User();
    console.log("In Try Block!");
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!err && user) {
        next(
          new BadRequestResponse(
            "User already registered with following email.",
            422.0
          )
        );
      } else{
        newUser.email = req.body.email.toLowerCase();
        newUser.fullname = req.body.fullname;
        newUser.setPassword(req.body.password);
        newUser.generateOTP();
        newUser.save().then((result) => {
          if (!result) {
            next(new InternalServerErrorResponse("Error saving user", 500.0));
          } else {
            next(
              new OkResponse(
                result.toAuthJSON(),
                "Data saved successfully!",
                200
              )
            );
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
    console.log("this");
    next(new BadRequestResponse("Something Unknown Happened!.", 422.0));
  }
});



router.post("/login",auth.isToken,auth.verifyOtp,passport.authenticate('local',{session: false}), (req, res, next) => {
   next(new OkResponse("Welcome",200.0));
});

module.exports = router;
