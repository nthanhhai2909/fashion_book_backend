'use strict'
const book = require('../models/book.model');

exports.getTotalPage = (req, res) => {
    book.find ({}, (err, docs) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
            return;
        }
        res.status(200).json({data: parseInt((docs.length - 1) / 9) + 1})
    })
}

exports.getAllBook = async (req,res) => {
    if ((typeof req.body.page === 'undefined')) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }

    let {page} = req.body;

    let bookFind = null;
    try {
        bookFind = await book.find ({});
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }

    let totalPage = await parseInt(((bookFind.length - 1) / 9) + 1);
    
    if ((page > totalPage) || (page < 1)) {
        res.status(409).json({ msg: 'invalid page'});
        return;
    }

    book
    .find ({})
    .skip( 9 * (page - 1) )
    .limit(9)
    .exec((err, docs) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
            return;
        }
        res.status(200).json({data: docs});
    });
}