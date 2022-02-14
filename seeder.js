require('dotenv').config();
const mongoose = require('mongoose');

require('./models/User');
require('./models/Categories')
require('./models/Properties')
mongoose.connect('mongodb://localhost:27017/parkbox').catch(err => {
        console.log(err.stack);
        process.exit(1);
    })
    .then((connection) => {
        console.log("connected to db in development environment");
        init();
    });;

    const seedUser = require('./seeder/user');
    const seedProperty = require('./seeder/properties')

async function init(){
    await seedUser(); 
    await seedProperty();
    exit();
}

function exit() {
    console.log('exiting')
    process.exit(1)
}