'use strict'
const publisher = require('../models/publisher.model');

exports.getAll = (req, res) => {
    publisher.find({}, (err, docs) => {
        if(err){
            console.log(err);
            res.status(500).json({msg: err});
            return;
        }
        res.status(200).json({data: docs})
    })
}