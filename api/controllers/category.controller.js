'use strict'
const category = require('../models/category.model');

exports.getAll = (req, res) => {
    category.find({}, (err, docs) => {
        if(err){
            res.status(500).json({msg: err});
            return;
        }
        res.status(200).json({data: docs})
    })
}
exports.getNameByID = async (req, res) => {
    if(req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let result
    try {
        result = await category.findById(req.params.id);
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
    res.status(200).json({name: result.name})
}