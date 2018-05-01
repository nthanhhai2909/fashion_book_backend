'use strict'
const user = require('../models/user.model');
const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
const number = '0123456789';
const generateEmail = () => {
    var string = '';
    string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    return string + '@gmail.com'
}
const generateFirstName = () => {
    let string = '';
    string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    return string
}
const generateLastName = () => {
    let string = '';
    string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    return string
}
const generatePassword = () => {
    let string = '';
    for(let i = 0; i < 6; i++) {
        string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    }
    return string;
}
const generateAddress = () => {
    let string = '';
    for(let i = 0; i < 6; i++) {
        string += chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random())];
    }
    return string;
}

const generateBirthday = () => {
    let day = Math.floor(Math.random() * 28 ) + 1;
    let month = Math.floor(Math.random() * 12 ) + 1;
    let yeah = Math.floor(Math.random() * 2017 ) + 1;
    return day + '/' + month + '/' + yeah;
}

const generatePhoneNumber = () => {
    let string = '';
    for(let i = 0; i < 10; i++) {
        string += number[Math.floor(Math.random() * number.length)];
    }
    return string;
}

exports.generate = () => {
    for(let i = 0; i < 10000; i++) {
        const new_user = new user ({
            email: generateEmail(),
            firstName: generateFirstName(),
            lastName: generateLastName(),
            password: generatePassword(),
            address: generateAddress(),
            birthday: generateBirthday(),
            phone_number: generatePhoneNumber()
        })
        new_user.save((err, data) => {
            if(err)
            console.log(err)
        })
    }
    
    
}