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

exports.getBookByCategory = async(req, res) => {
    if (typeof req.body.category === 'undefined'
        || typeof req.body.page === 'undefined'
    ) {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }

    let { category, page, range } = req.body;

    let bookCount, bookFind
    try {
        bookFind = await book.find({id_category: category});
    }
    catch(err){
        res.status(500).json({ msg: err });
        return;
    }
    bookCount = bookFind.length;
    let totalPage = parseInt(((bookCount - 1) / 9) + 1);

    console.log(page + " " + totalPage)
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
            res.status(200).json({ data: docs });
        })

}