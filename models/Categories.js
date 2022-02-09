const mongoose = require('mongoose')
const Schema = mongoose.Schema();

const CategorySchema = mongoose.Schema({
    category: String,
    isInsulated:{type:"Boolean",default:"false"},
    isElectricity:{type:"Boolean",default:"false"},
    isAlarm:{type:"Boolean",default:"false"},
    isSurveillance:{type:"Boolean",default:"false"},
    isWashingArea:{type:"Boolean",default:"false"},
    isBathroom:{type:"Boolean",default:"false"},
    isPaymentOnHeat:{type:"Boolean",default:"false"},
    isPaymentOnWater:{type:"Boolean",default:"false"},
    isSeperateEnterance:{type:"Boolean",default:"false"},
    isSecurityDeposit:{type:"Boolean",default:"false"},
    isPrepaidRent:{type:"Boolean",default:"false"},
})

module.exports = mongoose.model("Categories",CategorySchema);