'use strict'
const cart = require('../models/cart.model');
exports.addToCart = async (req, res) => {
    if(typeof req.body.id === 'undefined'
    || typeof req.body.products === 'undefined') {
        res.status(422).json({msg: 'invalid data'});
        return;
    }
    const { id, products } = req.body;
    let cartFind
    try {
        cartFind = await cart.findById(id)
    }
    catch(err) {
        const cart_new = new cart ({
            products: products
        })
        let cartsave;
        try {
            cartsave = await cart_new.save()
        }
        catch(err) {
            res.status(500).json({msg: err, id_cart: cartsave._id})
            return;
        }
        return;
    }
    if(cartFind === null) {
        const cart_new = new cart ({
            products: products
        })
        let cartsave;
        try {
            cartsave = await cart_new.save()
        }
        catch(err) {
            res.status(500).json({msg: err, id_cart: cartsave._id})
            return;
        }
    }
    let index = cartFind.products.findIndex(element => products[0]._id === element._id)
    if(index === -1) {
        cartFind = [...cart,  ...products]
    } else {
        cartFind.products[index].count = parseInt(cart[index].count) + parseInt(product.count)
    }
    try {
        cartFind.save()
    }
    catch(err) {
        res.status(500).json({msg: err, id_cart: cartFind._id})
        return;
    }
    res.status(200).json({msg: 'success', id_cart: cartFind._id});
}