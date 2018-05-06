'use strict'
const publisher_controller = require('../controllers/publisher.controller');
module.exports = (app) => {

    app.route('/publisher/all')
        .get(publisher_controller.getAll);
        app.route('/publisher/name/:id')
        .get(publisher_controller.getNameByID);
}