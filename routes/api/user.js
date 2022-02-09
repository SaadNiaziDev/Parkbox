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
    next(new BadRequestResponse("Something Unknown Happened!.", 422.0));
  }
});



router.post("/login",passport.authenticate('local',{session: false}),auth.verifyOtp, (req, res, next) => {
  User.findOne({email: req.user.email}, (err, data) => {
    next(new OkResponse(data));
  })
});

router.post("/createAdmin",auth.isToken,auth.isAdmin,(req, res, next)=>{
  try {
    let newUser = new User();
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
        newUser.role=1;
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
    next(new BadRequestResponse(err));
  }
});

router.post('/refreshOtp',(req, res, next)=>{
  User.findOne({email:req.body.email}, (err, user)=>{
    if(!err && user){
      console.log('hey');
      user.generateOTP();
      user.save();
     next(new OkResponse("Otp updated successfully!"));
    }else{
      next(new BadRequestResponse(err))
    }
  })
})

module.exports = router;
