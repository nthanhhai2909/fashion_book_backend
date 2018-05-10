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
        return
    })
}

exports.getNameByID = async (req, res) => {
    if(req.params.id === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    let result
    try {
        result = await publisher.findById(req.params.id);
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

exports.getIDBySearchText = async (searchText) => {
    let arr = [];
    try {
        arr = await publisher
            .find({name: new RegExp(searchText, "i")},{name: 0})
    }
    catch (err) {
        res.status(500).json({ msg: err });
        return;
    }
    return arr.map(i => i.id);
}