var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var FalcorServer = require('falcor-express');

/* ---- import falcor routers ---- */
var NavigationRouter    = require('./api/falcor/routers/navigation');

var routers = require('./api/express/routers/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---- falcor models API ---- */
app.use('/navigation/model.json',   FalcorServer.dataSourceRoute(() => new NavigationRouter()));

// express routers
app.use('/api', routers);

// static pages
app.use(express.static('./public'));

/* 404 */
app.use(function(req, res, next) {
    var err = new Error('Url is not found! ::: ' + req.url);
    err.status = 404;
    next(err);
});

module.exports = app;