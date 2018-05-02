'use strict'
const user = require('../models/user.model');
const nodemailer = require('../utils/nodemailer');
const randomstring = require('randomstring');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
    if ((typeof req.body.email === 'undefined')
        || (typeof req.body.password === 'undefined')
        || typeof req.body.firstName === 'undefined'
        || typeof req.body.lastName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.birthday === 'undefined'
        || typeof req.body.phone_number === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, password, firstName, lastName, address, birthday, phone_number} = req.body;
    if (email.indexOf("@") == -1 
        || password.length < 6 ){
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let userFind = null;
    try {
        userFind = await user.find({ 'email': email });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (userFind.length > 0) {
        res.status(409).json({ msg: 'Email already exist' }); 
        return;
    }
    const token = randomstring.generate();
    let sendEmail = await nodemailer.sendEmail(email, token);
    if (!sendEmail) {
        res.status(500).json({ msg: 'Send email fail' });
        return;
    }   
    password = bcrypt.hashSync(password, 10);
    const newUser = new user({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        address: address,
        birthday: birthday,
        phone_number: phone_number,
        token: token
    });
    try {
        await newUser.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' })
}

exports.verifyAccount = async (req, res) => {
    if(typeof req.params.token === 'undefined'){
        res.status(402).json({msg: "!invalid"});
        return;
    }
    let token = req.params.token;
    let tokenFind = null;
    try{
        tokenFind = await user.findOne({'token': token});
    }
    catch(err){
        res.status(500).json({msg: err});
        return;
    }
    if(tokenFind == null){
        res.status(404).json({msg: "not found!!!"});
        return;
    }
    try{
        await user.findByIdAndUpdate(tokenFind._id ,
            { $set: { is_verify: true }}, { new: true });
    }
    catch(err){
        res.status(500).json({msg: err});
        return;
    }
    res.status(200).json({msg:"success!"});
}

exports.login = async (req, res) => {
    if(typeof req.body.email === 'undefined'
    || typeof req.body.password == 'undefined'){
        res.json({msg: "Invalid data"});
        return;
    }
    let { email, password } = req.body;
    let userFind = null;
    try{
        userFind = await user.findOne({'email': email});
    }
    catch(err){
        res.json({msg: err});
        return;
    }
    if(userFind == null){
        res.status(422).json({msg: "Invalid data"});
        return;
    }

    if(!userFind.is_verify){
        res.status(401).json({msg: 'no_registration_confirmation'});
        return;
    }
    
    if(!bcrypt.compareSync(password, userFind.password)){
        res.status(422).json({msg: 'Invalid data'});
        return;
    }
    let token = jwt.sign({email: email}, 'shhhhh');
    res.status(200).json({msg: 'success', token: token});
}