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
        type: [
            {
                id_category: String,
                name: String,
                price: Number,
                release_date: Date,
                img: String,
                describe: String, 
                id_nsx: String,
                id_nsx: String,
                count: Number,
                _id: String,
            }
        ],
        required : true,
        minlength: 1,
    },
    address: String,
    phone: String,
    
})

module.exports = mongoose.model('bill', bill);