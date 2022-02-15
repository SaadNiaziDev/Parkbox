const faker = require("faker");
const mongoose = require("mongoose");
const Properties = require("../models/Properties");
const User = require("../models/User");
const Category = require("../models/Categories");

const seedProperty = async () => {
  var index = await User.find({});
  var cate = await Category.find({});
  for (var i = 0; i < 50; i++) {
    let properties = Properties();
    properties.user = index[i||0]._id;
    properties.category = cate[i%4]._id;
    properties.price = `${faker.datatype.number()} Rs`;
    properties.image.push(faker.image.image('','',true)); //  can use loop here incase to push more than one picture
    properties.address = faker.address.streetAddress(true);
    properties.description = faker.lorem.paragraph();
    properties.beds = `${faker.datatype.number({
      min: 0,
      max: 10,
    })} beds`;
    properties.baths = `${faker.datatype.number({
      min: 0,
      max: 10,
    })} baths`;
    properties.area = `${faker.datatype.number({
      min: 0,
      max: 100000,
    })} sq.ft`;
    await properties.save();
  }
  console.log("properties seeded!");
};

module.exports = seedProperty;
