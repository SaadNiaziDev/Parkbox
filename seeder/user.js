let faker = require("faker");
let mongoose = require("mongoose");
let User = require("../models/User");

const seedDB = async () => {
  let admin = new User();
  admin.email = "admin@gmail.com";
  admin.fullname = faker.name.findName();
  admin.image = faker.image.avatar();
  admin.setPassword("12345");
  admin.generateOTP();
  admin.package.name = faker.name.findName();
  admin.isEmailVerified = true;
  admin.role = 1;
  await admin.save();

  for (let i = 0; i < 50; i++) {
    let dummy = new User();
    dummy.fullname = faker.name.findName();
    dummy.email = faker.internet.email();
    dummy.image = faker.image.image('','','',true,true);
    dummy.setPassword("12345");
    dummy.role = 0;
    dummy.generateOTP();
    dummy.package.name = faker.name.findName();
    await dummy.save();
  }
  console.log("User seeded successfully!");
};

module.exports = seedDB;
