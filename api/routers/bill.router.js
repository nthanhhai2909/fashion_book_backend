'use strict'
const bill_controller = require('../controllers/bill.controller');
module.exports = (app) => {
    app.route('/bill/add')
        .post(bill_controller.addBill);
    app.route('/bill/verify/:token')
        .get(bill_controller.verifyPayment);
    app.route('/bill/:id_user')
        .get(bill_controller.getBillByIDUser);
}