const faker = require("faker");
const mongoose = require("mongoose");
const Properties = require("../models/Properties");
const User = require("../models/User");
const Category = require("../models/Categories");
let data = [];
var index;
var cate;
for (var i = 0; i < 50; i++) {
  User.find()
    .select("_id")
    .exec((err, user) => {
      if (!err && user) {
        index = user[Math.floor(Math.random() * 50)]._id;
      }
    });
  Category.find()
    .select("_id")
    .exec((err, category) => {
      if (!err && category) {
        cate = category[Math.floor(Math.random() * 4)]._id;
      }
    });
  let properties = Properties();
  properties.category = cate;
  properties.user = index;
  properties.price = Math.floor(Math.random() * 1000000).toString();
  properties.address = faker.address.streetAddress();
  properties.description = faker.name.findName();
  properties.beds = Math.floor(Math.random() * 5).toString();
  properties.baths = Math.floor(Math.random() * 5).toString();
  properties.area = Math.floor(Math.random() * 10000).toString();
  data.push(properties);
}

const seedProperty = async()=>{
    await Properties.deleteMany({})
    await Properties.insertMany(data)
}


module.exports = seedProperty;