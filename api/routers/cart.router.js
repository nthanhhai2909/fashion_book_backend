'use strict'
const cart_controller = require('../controllers/cart.controller');
module.exports = (app) => {
    app.route('/cart/addtocard')
        .post(cart_controller.addToCart);
}