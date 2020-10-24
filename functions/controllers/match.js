const admin = require("firebase-admin");

var db = admin.database();
var mRef = db.ref("matches");
var uRef = db.ref("users");

exports.list_all_matches = function (req, res) {
    let matches = [];
    mRef.orderByValue().once('value', snapshot => {
        snapshot.forEach(data => {
            matches.push(data.val());
        });
        res.json(matches);
    }, err => {
        res.send(err);
    });
}

exports.create_a_match = function (req, res) {
    let data = req.body;
    uRef.once('value', snapshot => {
        let users = snapshot.val();
        let user = data.user;
        let loggedUser = users.filter(u => u.authKey == user.authKey)[0];
        if (loggedUser) {
            mRef.push().set(data.match);
            res.json(data.match)
        } else {
            res.send('Not possible to save the match');
        }
    }, err => {
        res.send(err);
    });
}

exports.read_a_match = function (req, res) {

}

exports.update_a_match = function (req, res) {

}

exports.delete_a_match = function (req, res) {

}