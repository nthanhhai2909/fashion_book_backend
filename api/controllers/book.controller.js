'use strict'
const book = require('../models/book.model');

exports.getTotalPage = (req, res) => {
    book.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).json({ msg: err });
            return;
        }
        res.status(200).json({ data: parseInt((docs.length - 1) / 9) + 1 })
    })
}

exports.getAllBook = async (req, res) => {
    if ((typeof req.body.page === 'undefined')) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }

    let { page } = req.body;
    let range = null;
    var objRange = null;

    if (typeof req.body.range !== 'undefined') {
        range = req.body.range;
        objRange = JSON.parse(range);
    }

    let bookCount = null;
    try {
        if (range !== null) {
            bookCount = await book
                .count({ price: { $gte: objRange.low, $lte: objRange.high } });
        }
        else {
            bookCount = await book.count({});
        }
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }

    let totalPage = await parseInt(((bookCount - 1) / 9) + 1);
    if ((parseInt(page) > totalPage) || (parseInt(page) < 1)) {
        res.status(409).json({ msg: 'Invalid page', totalPage });
        return;
    }

    if (range !== null) {
        book
            .find({ price: { $gte: objRange.low, $lte: objRange.high } })
            .skip(9 * (parseInt(page) - 1))
            .limit(9)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage });
            });
    }
    else {
        book
            .find({})
            .skip(9 * (parseInt(page) - 1))
            .limit(9)
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage });
            });
    }
}

exports.getBookByCategory = async (req, res) => {
    if (typeof req.body.category === 'undefined'
        || typeof req.body.page === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }

    let { category, page} = req.body;

    let range = null;
    var objRange = null;

    if (typeof req.body.range !== 'undefined') {
        range = req.body.range;
        objRange = JSON.parse(range);
    }

    let bookCount, bookFind;

    if (typeof req.body.range === 'undefined') {
        try {
            bookFind = await book.find({ id_category: category });
        }
        catch (err) {
            res.status(500).json({ msg: err });
            return;
        }

        bookCount = bookFind.length;
        let totalPage = parseInt(((bookCount - 1) / 9) + 1);

        if (parseInt(page) < 1 || parseInt(page) > totalPage) {
            res.status(409).json({ msg: 'Page incorrect.' });
            return;
        }

        book.find({ id_category: category })
            .limit(9)
            .skip(9 * (page - 1))
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage: totalPage });
            })
    } else {
        try {
            bookFind = await book.find({ id_category: category, price: { $gt: objRange.low, $lt: objRange.high } });
        }
        catch (err) {
            res.status(500).json({ msg: err });
            return;
        }

        bookCount = bookFind.length;
        let totalPage = parseInt(((bookCount - 1) / 9) + 1);

        if (parseInt(page) < 1 || parseInt(page) > totalPage) {
            res.status(409).json({ msg: 'Page incorrect.' });
            return;
        }

        book.find({ id_category: category, price: { $gt: objRange.low, $lt: objRange.high } })
            .limit(9)
            .skip(9 * (page - 1))
            .exec((err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: err });
                    return;
                }
                res.status(200).json({ data: docs, totalPage: totalPage });
            })
    }
}

exports.getBookByID = async (req, res) => {
    if(req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let result
    try {
        result = await book.findById(req.params.id);
    }
    catch(err) {
        console.log(err)
        res.status(500).json({msg: err})
        return;
    }
    if(result === null){
        res.status(404).json({msg: "not found"})
        return;
    }
    result.view_counts = result.view_counts + 1;
    result.save((err,docs) => {
        if(err){
            console.log(err);
        }
    });
    res.status(200).json({data: result})
}