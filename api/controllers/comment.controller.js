'use strict'
const _comment = require('../models/comment.model');
const book = require('../models/book.model');

exports.mycomment = async (req, res) => {
    if(typeof req.body.id_user === 'undefined'
    || typeof req.body.id_book === 'undefined'
    || typeof req.body.name === 'undefined'
    || typeof req.body.comment === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    
    let {id_user, id_book, name, comment} = req.body;
    let bookFind
    try { 
        bookFind = await book.findById(id_book)
    }
    catch(err){
        res.status(422).json({ msg: ' ID book Invalid data' });
        return;
    }
    console.log(bookFind)
    const new_comment = _comment ({
        id_user: id_user,
        id_book: id_book,
        name: name,
        comment: comment
    })
    try {
        new_comment.save()
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: err });
        return;
    }
    res.status(201).json({ msg: 'success' })
    return
}