const faker = require("faker");
const mongoose = require("mongoose");
const Properties = require("../models/Properties");
const User = require("../models/User");
const Category = require("../models/Categories");

const seedProperty = async () => {
  // var duration = ['7','14','30'];
  // var price =['1000','5000','10000'];
  var index = await User.find({});
  var cate = await Category.find({});
  for (var i = 0; i < 50; i++) {
    let chr = faker.datatype.number({ // to create random number of images to push in array
      min: 1,
      max:5
    });
    var latitude = faker.address.latitude(30,40);
    var longitude = faker.address.longitude(60,70);
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
    properties.zipcode = faker.address.zipCode('#####');
    properties.expiryDate = (Date.now() + faker.datatype.number({
      min:60000,
      max:300000}))
    properties.location={
      type:'Point',
      coordinates:[longitude,latitude],
    };
    // properties.boost.duration=duration[faker.datatype.number({
    //   min:0,
    //   max:2,
    // })],
    // properties.boost.price=price[faker.datatype.number({
    //   min:0,
    //   max:2,
    // })], 
    // properties.boost.expires = Date.now() + faker.datatype.number({
    //   min:60000*30,     //30mints
    //   max:60000*60,     //60mints
    // })
    await properties.save();
  }
  console.log("properties seeded!");
};

module.exports = seedProperty;
