'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema ({
    id_user: {
        type: String,
        default: 'no_user'
    },
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    comment: {
        type: String
    },
    date: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model('comment', comment);