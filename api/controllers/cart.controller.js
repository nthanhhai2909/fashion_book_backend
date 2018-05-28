'use strict'
const cart = require('../models/cart.model');
exports.addToCart = async (req, res) => {
    if(typeof req.body.id_user === 'undefined'
    || typeof req.body.products === 'undefined') {
        res.status(422).json({msg: 'invalid data'});
        return;
    }
    const { id_user, products } = req.body;
    var cartFind
    try {
        cartFind = await cart.findOne({id_user: id_user})
    }
    catch(err) {
        const cart_new = new cart ({
            id_user: id_user,
            products: products
        })
        let cartsave;
        try {
            cartsave = await cart_new.save()
        }
        catch(err) {
            res.status(500).json({msg: err})
            return;
        }
        return;
    }
    if(cartFind === null) {
        const cart_new = new cart ({
            id_user: id_user,
            products: products
        })
        let cartsave;
        try {
            cartsave = await cart_new.save()
        }
        catch(err) {
            res.status(500).json({msg: err})
            return;
        }
        return;
    }
    let index = cartFind.products.findIndex(element => products._id === element._id)
    if(index === -1) {
        cartFind.products.push(products)
    } else {
        cartFind.products[index].count = parseInt(cartFind.products[index].count) + parseInt(products.count);
        console.log(cartFind.products[index].count)
    }
    try {
        cartFind.save()
    }
    catch(err) {
        res.status(500).json({msg: err})
        return;
    }
    res.status(200).json({msg: 'success'});
}