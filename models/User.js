const mongoose = require('mongoose')
const Schema = mongoose.Schema();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema= Schema({
email:{type: 'string',lowercase: true,required: true},
salt:String,
hash:String,
image:String,
});

UserSchema.methods.validPassword = function() {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

module.exports = mongoose.model("User",UserSchema);