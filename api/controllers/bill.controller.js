'use strict'
const bill = require('../models/bill.model');

exports.addBill = async (req, res) => {
    if (typeof req.body.id_user === 'undefined'
        || typeof req.body.products === 'undefined') {
        res.status(422).json({ msg: 'Invalid data' });
        return;
    }
    console.log(req.body.products)
    console.log(typeof req.body.products)
    console.log(req.body.products.length)
    res.status(422).json({ msg: 'Invalid data' });
}