module.exports = {
    init(app, bodyParser, allowCrossDomain) {

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(allowCrossDomain);
        var routes = require('../routes/users');
        routes(app);
    }
}