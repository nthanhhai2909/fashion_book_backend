'use strict'
const user_controller = require('../controllers/user.controller');
module.exports = (app) => {
    app.route('user/register')
    .post(user_controller.register);

    app.route('/user/verify/:token')
    .get(user_controller.verifyAccount);

    app.route('/user/login')
    .post(user_controller.login);

    app.route('/user/request/resetpassword/:email')
    .get(user_controller.requestResetPassword)

    app.route('/user/verify/resetpassword')
    .post(user_controller.verifyResetPassword)

    app.route('/user/resetpassword')
    .post(user_controller.resetPassword)
}