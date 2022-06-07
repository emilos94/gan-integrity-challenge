const express = require('express');
const app = express();
const config = require('./config');

var routes = require('./api/routes/cityRoutes');
routes(app);

app.listen(config.port);

console.log('City/Address api running, listening on: ' + config.protocol + '://' + config.domain + ':' + config.port);