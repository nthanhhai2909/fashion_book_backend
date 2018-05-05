'use strict'
const book_controller = require('../controllers/book.controller');
module.exports = (app) => {
    app.route('/book/totalpage')
        .get(book_controller.getTotalPage);
}