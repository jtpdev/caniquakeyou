const admin = require("firebase-admin");

var db = admin.database();
var uRef = db.ref("users");

exports.login = function (req, res) {
    console.log(req)
    let credentials = req.body;
    uRef.once('value', snapshot => {
        let users = snapshot.val();
        let loggedUser = users.filter(u => {
            return u.username == credentials.username
                && u.password == credentials.password
        })[0];

        res.json(loggedUser);
    });
}
