const faker = require("faker");
const mongoose = require("mongoose");
const Properties = require("../models/Properties");
const User = require("../models/User");
const Category = require("../models/Categories");

const seedProperty = async () => {
  var index = await User.find({});
  var cate = await Category.find({});
  for (var i = 0; i < 50; i++) {
    let chr = faker.datatype.number({
      min: 1,
      max:5
    });
    let properties = Properties();
    properties.user = index[i||0]._id;
    properties.category = cate[i%4]._id;
    properties.price = `${1000*Math.ceil(faker.datatype.number()/1000)} Rs`;
    for(chr;chr<=5;chr++){
    properties.image.push(faker.image.image('','',true));} //  can use loop here incase to push more than one picture
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
    properties.area = `${100*Math.ceil(faker.datatype.number({
      min: 0,
      max: 100000,
    })/100)} sq.ft`;
    properties.isSeperateEnterance = faker.datatype.boolean();
    properties.isInsulated = faker.datatype.boolean();
    properties.isElectricity = faker.datatype.boolean();
    await properties.save();
  }
  console.log("properties seeded!");
};

module.exports = seedProperty;
