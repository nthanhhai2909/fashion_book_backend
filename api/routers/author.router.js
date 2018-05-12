'use strict'
const author_controller = require('../controllers/author.controller');
module.exports = (app) => {
    app.route('/author/all')
        .get(author_controller.getAll);
}