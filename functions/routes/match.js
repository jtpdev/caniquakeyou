'use strict';

module.exports = function(app) {

    var matches = require('../controllers/match');

    app.route('/matches')
        .get(matches.list_all_matches)
        .post(matches.create_a_match);

    app.route('/matches/:id')
        .get(matches.read_a_match)
        .put(matches.update_a_match)
        .delete(matches.delete_a_match)

};