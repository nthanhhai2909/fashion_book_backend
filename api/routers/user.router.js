'use strict'
const user_controller = require('../controllers/user.controller');
module.exports = (app) => {
    app.route('/register')
    .post(user_controller.register);
}