'use strict'
const category = require('../models/category.model');
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
const generateName = () => {
    let string = '';
    string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    return string
}

exports.generate = () => {
    for(let i = 0; i < 10000; i++) {
        const new_category = new category ({
            name: generateName()
        })
        new_category.save((err, data) => {
            if(err)
            console.log(err)
        })
    }
    
    
}