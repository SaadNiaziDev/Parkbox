const mongoose = require('mongoose')
const Schema = mongoose.Schema();

const PropertySchema = Schema({
    category: {type:mongoose.Schema.Types.ObjectId,ref:"Categories"},
    price:String,
    image:String,
    address:String,
    description:String,
    beds:String,
    baths:String,
    area:String
})

module.exports = mongoose.model("Properties",PropertySchema);