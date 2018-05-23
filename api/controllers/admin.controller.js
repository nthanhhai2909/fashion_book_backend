'use strict'
var cloudinary = require('cloudinary').v2;
var uploads = {};
cloudinary.config({
    cloud_name: 'dfdshjkfdkslg',
    api_key: '154225725378198',
    api_secret: 'sW872P77XiwRqkVmz7T_ruUGePQ'
});

const book = require('../models/book.model');

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