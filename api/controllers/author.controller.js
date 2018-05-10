'use strict'
const author = require('../models/author.model');

exports.getIDBySearchText = async (searchText) => {
    let arr = [];
    try {
        arr = await author.find({name: new RegExp(searchText, "i")},{name: 0});
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    return arr.map(i => i.id);
}