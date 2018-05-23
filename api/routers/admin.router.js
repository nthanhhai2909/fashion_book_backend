'use strict'
const admin_controller = require('../controllers/admin.controller');
module.exports = (app) => {
    app.route('/admin/updatebook')
        .post(admin_controller.updateBook);
    app.route('/admin/deletebook/:id')
        .get(admin_controller.deletebook);
}