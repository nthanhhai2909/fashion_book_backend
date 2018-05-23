'use strict'
var cloudinary = require('cloudinary').v2;
var uploads = {};
cloudinary.config({
    cloud_name: 'dfdshjkfdkslg',
    api_key: '154225725378198',
    api_secret: 'sW872P77XiwRqkVmz7T_ruUGePQ'
});

const book = require('../models/book.model');
const user = require('../models/user.model');
const category = require('../models/category.model');
const author = require('../models/author.model');

exports.updateBook = async (req, res) => {
    var formData = new FormData();
    formData.get(img);
    console.log(req.file);
    if (typeof req.body.name === 'undefined'
        || typeof req.body.price === 'undefined'
        || typeof req.body.release_date === 'undefined'
        || typeof req.body.img === 'undefined'
        || typeof req.body.describe === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name, price, release_date, img, describe } = req.body;
    let bookFind;
    try {
        bookFind = await book.findById(id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    if (bookFind === null) {
        res.status(404).json({ msg: "Not found" })
        return;
    }
    cloudinary.uploader.upload(img, function (error, result) { bookFind.img = result.secure_url });
    bookFind.name = name;
    bookFind.price = price;
    bookFind.release_date = release_date;
    bookFind.describe = describe;
    bookFind.save((err, docs) => {
        if (err) {
            console.log(err);
        }
    });
    res.status(200).json({ msg: 'success', data: bookFind });
}

exports.deletebook = async (req, res) => {
    if (typeof req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let bookFind;
    try {
        bookFind = await book.findById(req.params.id);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
        return;
    }
    bookFind.remove();
    res.status(200).json({ msg: 'success',});
}

exports.updateUser = async (req, res) => {
    if (typeof req.body.email === 'undefined'
        || typeof req.body.firstName === 'undefined'
        || typeof req.body.lastName === 'undefined'
        || typeof req.body.address === 'undefined'
        || typeof req.body.phone_number === 'undefined'
        || typeof req.body.is_admin === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { email, firstName, lastName, address, phone_number, is_admin } = req.body;
    let userFind;
    try {
        userFind = await user.findOne({'email': email})
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    if(userFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    userFind.firstName = firstName;
    userFind.lastName = lastName;
    userFind.address = address;
    userFind.phone_number = phone_number;
    userFind.is_admin = is_admin;
    try {
        await userFind.save()
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    res.status(200).json({msg: 'success', user: {
        email: userFind.email,
        firstName: userFind.firstName,
        lastName: userFind.lastName,
        address: userFind.address,
        phone_number: userFind.phone_number,
        is_admin: userFind.is_admin
    }});
}

exports.deleteUser = async (req, res) => {
    if (typeof req.params.email === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let userFind;
    try {
        userFind = await user.findOne({'email': req.params.email})
    }
    catch(err) {
        res.status(500).json({ msg: err });
        return;
    }
    userFind.remove();
    res.status(200).json({ msg: 'success'});
}

exports.addCategory = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind.length > 0) {
        res.status(409).json({ msg: 'Category already exist' });
        return;
    }
    const newCategory = new category({ name: name });
    try {
        await newCategory.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateCategory = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let categoryFind;
    try {
        categoryFind = await category.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (categoryFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    categoryFind.name = name;
    try {
        await categoryFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', category: { name: name } });
}

exports.addAuthor = async (req, res) => {
    if (typeof req.body.name === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { name } = req.body;
    let authorFind;
    try {
        authorFind = await author.find({ 'name': name });
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (authorFind.length > 0) {
        res.status(409).json({ msg: 'Author already exist' });
        return;
    }
    const newAuthor = new category({ name: name });
    try {
        await newAuthor.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' });
}

exports.updateAuthor = async (req, res) => {
    if (typeof req.body.id === 'undefined'
        || typeof req.body.name === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let { id, name } = req.body;
    let authorFind;
    try {
        authorFind = await author.findById(id);
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    if (authorFind === null) {
        res.status(422).json({ msg: "not found" });
        return;
    }
    authorFind.name = name;
    try {
        await authorFind.save();
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success', author: { name: name } });
}