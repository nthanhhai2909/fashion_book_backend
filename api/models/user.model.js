'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
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
        validate: {
            validator: function (v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
        required: [true, 'User phone number required']
    },
});
module.exports = mongoose.model('user', user);