'use strict'
const category = require('../models/category.model');

exports.getAll = (req, res) => {
    category.find({}, (err, docs) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
            return;
        }
        res.status(200).json({data: docs})
    })
}