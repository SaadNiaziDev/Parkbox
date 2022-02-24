const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const BoostSchema = mongoose.Schema({
    no_of_days:{type:"String", default:"0"},
    price:{ type: "String",default:"0"}
})

module.exports = mongoose.model("Boosts",BoostSchema);