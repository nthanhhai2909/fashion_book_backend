'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bill = new Schema ({
    id_user: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    }
})

module.exports = mongoose.model('bill_detail', bill_detail);