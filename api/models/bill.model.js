'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = new Schema ({
    id_user: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    },
    date: {
        type: Date,
        default: new Date()
    },
    products: {
        type: Array,
        required : true,
        minlength: 1,
    }
})

module.exports = mongoose.model('bill', bill);