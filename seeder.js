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
    const seedCategory = require('./seeder/categories');
    const seedProperty = require('./seeder/properties');

async function init(){
    console.log("dropping DB");
	await mongoose.connection.db.dropDatabase();
    await seedUser(); 
    await seedCategory();
    await seedProperty();
    exit();
}

function exit() {
    console.log('exiting')
    process.exit(1)
}