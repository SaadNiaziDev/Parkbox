const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const {InternalServerErrorResponse, UnauthorizedResponse } =  require('express-http-response');
let BadRequestResponse = require('express-http-response').BadRequestResponse;
const {  validationResult } = require('express-validator')

const isToken = function (req, res, next) {
    var token = req.headers.authorization.split(" ");
    if (typeof token[1] === "undefined" || typeof token[1] === null) {
      throw new UnauthorizedResponse("Please login first to continue further!",403);
    } else {
      jsonwebtoken.verify(token[1], "shhhhh", (err, data) => {
        if (err) {
          throw new UnauthorizedResponse("Please login first to continue further!",403);
        } else {
          req.user = data;
          next();
        }
      });
    }
};


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
         console.log(req.body);
         next( new BadRequestResponse("Missing required parameter.", 422.0))
    }else {
        next();
    }
}

const isEmail = function (req, res, next) {
    User.count({'$and':[{email:req.body.email}]},(err,count)=>{
        if(err){
            next(new InternalServerErrorResponse ())
        }
        else if(count>0){
            next(new BadRequestResponse ('Email already exist!',422.0))
        }else{
            next();
        }
    })
}

const isSame = function (req, res, next) {
  if(req.body.password !== req.body.rePassword){
    next(new BadRequestResponse("Password mismatch"));
  }else{
    next();
  }
}

module.exports = {validate,isToken,isEmail,isSame}