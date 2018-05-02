'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    email: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "can't be blank"]
    },
    address: {
        type: String
    },
    birthday: {
        type: String
    },
    phone_number: {
        type: String,
        required: [true, 'User phone number required']
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_verify: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model('user', user);