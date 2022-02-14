const mongoose = require('mongoose')
const paginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema();

const CategorySchema = mongoose.Schema({
    name: String,
    isInsulated:{type:"Boolean",default:"false"},
    isElectricity:{type:"Boolean",default:"false"},
    isAlarm:{type:"Boolean",default:"false"},
    isSurveillance:{type:"Boolean",default:"false"},
    isWashingArea:{type:"Boolean",default:"false"},
    isPaymentOnHeat:{type:"Boolean",default:"false"},
    isPaymentOnWater:{type:"Boolean",default:"false"},
    isSeperateEnterance:{type:"Boolean",default:"false"},
    isSecurityDeposit:{type:"Boolean",default:"false"},
    isPrepaidRent:{type:"Boolean",default:"false"},
})
CategorySchema.plugin(paginate);

module.exports = mongoose.model("Categories",CategorySchema);