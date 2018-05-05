'use strict'
const book = require('../models/book.model');

exports.getTotalPage = (req, res) => {
    book.find ({},(err, docs) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
            return;
        }
        res.status(200).json({data: parseInt((docs.length - 1) / 9) + 1})
    })
}