const Boost = require('../models/Boost');

const seedBoosts = async()=>{
let boost1 = new Boost();
boost1.no_of_days="7",
boost1.price="1000",
await boost1.save();

let boost2 = new Boost();
boost2.no_of_days="14",
boost2.price="5000",
await boost2.save();

let boost3 = new Boost();
boost3.no_of_days="30",
boost3.price="10000",
await boost3.save();
}


console.log("Boosts seeded successfully")
module.exports = seedBoosts;