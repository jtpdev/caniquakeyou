'use strict';

module.exports = function(app) {

    var users = require('../controllers/users');

    app.route('/login')
        .post(users.login);

};