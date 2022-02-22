const mongoose = require("mongoose");
const Categories = require("./Categories");
const paginate = require("mongoose-paginate-v2");
//const geoLocation = require("./GeoLocation");
const User = require("./User");
const Schema = mongoose.Schema();

const geoLocation = mongoose.Schema({
  type: { type: "String", default: "Point" },
  coordinate: [{ type: "Number" }],
});

const PropertySchema = mongoose.Schema(
  {
    category: { type: mongoose.Schema.Types.ObjectId, ref: Categories },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User },
    price: { type: "String", default: "0" },
    image: [{ type: "String" }],
    address: { type: "String", default: "Street xyz" },
    description: { type: "String", default: "Street,City,Province" },
    beds: { type: "String", default: "0" },
    baths: { type: "String", default: "0" },
    area: { type: "String", default: "0x0" },
    isInsulated: { type: "Boolean", default: "false" },
    isSeperateEnterance: { type: "Boolean", default: "false" },
    isElectricity: { type: "Boolean", default: "false" },
    //////////////////////////////// expiry date////////////////////////////////
    expiryDate: { type: "Date", default: null },
    location: {
      type: geoLocation,
      index: "2dsphere",
      coordinate: [{ type: "Number", default: "0" }],
    },
  },
  { timestamps: true }
);
PropertySchema.plugin(paginate);
var autoPopulate = function (next) {
  this.populate("category");
  next();
};

PropertySchema.pre("findOne", autoPopulate);
PropertySchema.pre("find", autoPopulate);
PropertySchema.pre("findById", autoPopulate);

module.exports = mongoose.model("Properties", PropertySchema);
