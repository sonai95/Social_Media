"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const db = 'mongodb+srv://suvadeep95:ilove2CODE@cluster0-inxse.mongodb.net/smart_tv?retryWrites=true&w=majority'
mongoose.connect(db);

var newUSer = new Schema({
    userId: String,
    password: String,
    email: String,
    mobile: String,
    friends: { type: [String] },
    name: String,
    age: Number,
    userProfilePic: String,
    requested: { type: [String] },
    received: { type: [String] }
});

module.exports = mongoose.model("newUSer", newUSer);