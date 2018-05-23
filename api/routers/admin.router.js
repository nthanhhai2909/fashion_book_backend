'use strict'
const admin_controller = require('../controllers/admin.controller');
module.exports = (app) => {
    app.route('/admin/updatebook')
        .post(admin_controller.updateBook);
    app.route('/admin/deletebook/:id')
        .get(admin_controller.deletebook);
    app.route('/admin/updateuser')
        .post(admin_controller.updateUser);
    app.route('/admin/deleteuser/:email')
        .get(admin_controller.deleteUser);
    app.route('/admin/addcategory')
        .post(admin_controller.addCategory);
    app.route('/admin/updatecategory')
        .post(admin_controller.updateCategory);
    app.route('/admin/addauthor')
        .post(admin_controller.addAuthor);
    app.route('/admin/updateauthor')
        .post(admin_controller.updateAuthor);
    app.route('/admin/addpublisher')
       .post(admin_controller.addPublisher);
    app.route('/admin/updatepublisher')
       .post(admin_controller.updatePublisher);
    app.route('/admin/adduser')
       .post(admin_controller.addUser);
}