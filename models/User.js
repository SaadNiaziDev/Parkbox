const mongoose = require("mongoose");
const faker = require("faker");
const Schema = mongoose.Schema();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const paginate = require("mongoose-paginate-v2");

const UserSchema = mongoose.Schema(
  {
    email: { type: "string", lowercase: true, required: true },
    status: {
      type: "string",
      lowercase: true,
      required: true,
      default: "active",
    },
    fullname: { type: "String" },
    salt: { type: "String" },
    hash: { type: "String" },
    image: { type: "String" },
    otp: { type: "String" },
    otp_expires: { type: "Date" },
    isEmailVerified: { type: "Boolean", default: "false" },
    package: {
      name: { type: "string", lowercase: true},
      no_of_posts: { type: "Number", default: "0" },
    },
    role: {
      type: Number,
      enum: [
        0, //User
        1, //Admin
      ],
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);

UserSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.generateOTP = function () {
  this.otp = faker.datatype.number({
    min: 1000,
    max: 9999,
  });
  this.otp_expires = Date.now() + 1000 * 60 * 60;
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.TOKON_SECRET,
    {
      expiresIn: "72h",
    }
  );
};

UserSchema.methods.toAuthJSON = function () {
  return {
    fullname: this.fullname,
    email: this.email,
    image: this.image,
    status: this.status,
    token: this.generateJWT(),
  };
};

UserSchema.methods.toJSON = function () {
  return {
    otp: this.otp,
    otp_expires: this.otp_expires,
    email: this.email,
    image: this.image,
    status: this.status,
    isEmailVerified: this.isEmailVerified,
  };
};

module.exports = mongoose.model("User", UserSchema);
