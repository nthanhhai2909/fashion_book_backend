'use strict'
const admin_controller = require('../controllers/admin.controller');
module.exports = (app) => {
    app.route('/admin/updatebook')
        .post(admin_controller.updateBook);
    app.route('/admin/deletebook/:id')
        .get(admin_controller.deletebook);
    app.route('/admin/updateuser')
        .post(admin_controller.updateUser);
    app.route('/admin/addpublisher')
       .post(admin_controller.addPublisher);
    app.route('/admin/updatepublisher')
       .post(admin_controller.updatePublisher);
}