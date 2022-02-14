let faker = require("faker");
let mongoose = require("mongoose");
let User = require("../models/User")

let users = [];
let admin = new User();
admin.email = "admin@gmail.com";
admin.fullname = faker.name.findName();
admin.setPassword("12345");
admin.role = 1;
users.push(admin);

for(let i = 0; i < 50; i++){
    let dummy = new User();
    dummy.fullname = faker.name.findName();
    dummy.email = faker.internet.email();
    dummy.setPassword("12345");
    dummy.role = 0;
    users.push(dummy);
}

const seedDB = async () => {
    await User.deleteMany({})
    await User.insertMany(users)

}

module.exports = seedDB;
