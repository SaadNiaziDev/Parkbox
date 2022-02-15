let faker = require("faker");
let mongoose = require("mongoose");
const Category = require("../models/Categories")

const seedCategory = async () => {
const category1 = new Category();
category1.name="Garage";
category1.isInsulated = "true";
category1.isElectricity = "true";
category1.isAlarm = "true";
category1.isSurveillance = "true";
category1.isWashingArea = "true";
category1.isPaymentOnHeat = "true";
category1.isPaymentOnWater = "true";
category1.isSeperateEnterance = "true";
category1.isPrepaidRent = "true";
await category1.save();

const category2 = new Category();
category2.name="Business Premises";
category2.isInsulated = "true";
category2.isElectricity = "true";
category2.isAlarm = "true";
category2.isSurveillance = "true";
category2.isWashingArea = "true";
category2.isPaymentOnHeat = "false";
category2.isPaymentOnWater = "true";
category2.isSeperateEnterance = "false";
category2.isPrepaidRent = "true";
await category2.save();

const category3 = new Category();
category3.name="Depot";
category3.isInsulated = "false";
category3.isElectricity = "true";
category3.isAlarm = "true";
category3.isSurveillance = "true";
category3.isWashingArea = "false";
category3.isPaymentOnHeat = "true";
category3.isPaymentOnWater = "true";
category3.isSeperateEnterance = "true";
category3.isPrepaidRent = "true";
await category3.save();

const category4 = new Category();
category4.name="Parking Lot";
category4.isInsulated = "false";
category4.isElectricity = "true";
category4.isAlarm = "true";
category4.isSurveillance = "true";
category4.isWashingArea = "false";
category4.isPaymentOnHeat = "false";
category4.isPaymentOnWater = "false";
category4.isSeperateEnterance = "true";
category4.isPrepaidRent = "true";
await category4.save();
}

console.log("categories seeded successfully")
module.exports = seedCategory;