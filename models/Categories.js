const mongoose = require('mongoose')
const Schema = mongoose.Schema();

const CategorySchema = mongoose.Schema({
    category: String,
    isInsulated:Boolean,
    isElectricity:Boolean,
    isAlarm:Boolean,
    isSurveillance:Boolean,
    isWashingArea:Boolean,
    isBathroom:Boolean,
    isPaymentOnHeat:Boolean,
    isPaymentOnWater:Boolean,
    isSeperateEnterance:Boolean,
    isSecurityDeposit:Boolean,
    isPrepaidRent:Boolean,
})

module.exports = mongoose.model("Categories",CategorySchema);