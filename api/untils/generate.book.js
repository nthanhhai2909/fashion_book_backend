'use strict'
const book  = require('../models/book.model');
const category = require('../models/category.model');
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
const number = '0123456789';
var listID = []
const generateIDCategory = async () => {
    await category.find({}, '_id', function(err, data) {
        listID = data   
      });
}
const generateName = () => {
    let string = '';
    string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    return string
}


const generatePrice = () => {
    let price = Math.floor(Math.random() * 2017 ) + 1;
    return price;
}

const generatePhoneNumber = () => {
    let string = '';
    for(let i = 0; i < 10; i++) {
        string += number[Math.floor(Math.random() * number.length)];
    }
    return string;
}

exports.generate = async() => {
    await generateIDCategory();
    for(let i = 0; i < listID.length; i++)
        console.log(listID[i])
    for(let i = 0; i < 10000; i++) {
        const new_book = new book ({
            id_category: listID[Math.floor(Math.random() * listID.length)]._id,
            name: generateName(),
            price: generatePrice(),
            img: generateName(),
            describe: generateName(),
            NSX: generateName(),
            NPH: generateName(),
            view_counts: generatePrice(),
            sales: generatePrice()
        })
        new_book.save((err, data) => {
            if(err)
            console.log(err)
        })
    }
}