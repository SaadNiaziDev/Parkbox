const mongoose = require('mongoose');
const Categories = require('./Categories');
const User = require('./User');
const Schema = mongoose.Schema();

const PropertySchema = mongoose.Schema({
    category: {type:mongoose.Schema.Types.ObjectId,ref:Categories},
    user: {type:mongoose.Schema.Types.ObjectId,ref:User},
    price:String,
    image:String,
    address:String,
    description:String,
    beds:String,
    baths:String,
    area:String,
    isInsulated:{type:"Boolean",default:"false"},
    isSeperateEnterance:{type:"Boolean",default:"false"},
    isElectricity:{type:"Boolean",default:"false"}
})

module.exports = mongoose.model("Properties",PropertySchema);