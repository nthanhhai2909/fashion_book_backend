'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema ({
    id_user: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date()
    },
    products: {
        type: Array,
        required : true,
        minlength: 1,
    },
})

module.exports = mongoose.model('cart', cart);