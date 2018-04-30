'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const book = new Schema({
    id_category: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    },
    name: {
        type: String,
        required: [true, "can't be blank"],
        index: true,
    },
    price: {
        type: String,
        required: [true, "can't be blank"],
    },
    img: {
        type: String,
        required: [true, "can't be blank"],
    },
    describe: {
        type: String,
        default: "",
    },
    NSX: {
        type: String,
        required: [true, "can't be blank"],
    },
    NPH: {
        type: String,
        required: [true, "can't be blank"],
    }
})