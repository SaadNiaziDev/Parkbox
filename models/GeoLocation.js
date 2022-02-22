const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const LocationSchema = mongoose.Schema({
    type:{type:"String",default:"Point"},
    coordinate:[{type:"Number"}]
});

module.exports = mongoose.model("Geolocation",LocationSchema);