const User = require("../models/User");
const jsonwebtoken = require("jsonwebtoken");
const {
  InternalServerErrorResponse,
  UnauthorizedResponse,
  BadRequestResponse,
} = require("express-http-response");
const { validationResult } = require("express-validator");

const isToken = function (req, res, next) {
  var token = req.headers.authorization.split(" ");
  if (typeof token[1] === "undefined" || typeof token[1] === null) {
    throw new UnauthorizedResponse(
      "Please login first to continue further!",
      403
    );
  } else {
    jsonwebtoken.verify(token[1], "shhhhh", (err, data) => {
      if (err) {
        throw new UnauthorizedResponse(
          "Please login first to continue further!",
          403
        );
      } else {
        req.user = data;
        next();
      }
    });
  }
};

const isEmail = function (req, res, next) {
  User.count({ $and: [{ email: req.body.email }] }, (err, count) => {
    if (err) {
      next(new InternalServerErrorResponse());
    } else if (count > 0) {
      next(new BadRequestResponse("Email already exist!", 422.0));
    } else {
      next();
    }
  });
};

const isSame = function (req, res, next) {
  if (req.body.password !== req.body.rePassword) {
    next(new BadRequestResponse("Password mismatch"));
  } else {
    next();
  }
};

const isAdmin = function (req, res, next) {
  User.findOne({ email: req.user.email }, (err, data) => {
    if (data.role === 1) {
      next();
    } else next(new BadRequestResponse("You dont have permission to access"));
  });
};
module.exports = { isToken, isEmail, isSame, isAdmin };
