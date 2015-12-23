var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var FalcorServer = require('falcor-express');

/* ---- import falcor routers ---- */
import NavigationRouter     from './api/falcor/routers/navigation';
import UserRouter           from './api/falcor/routers/user';

var userRouter = require('./routers/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---- falcor models API ---- */
app.use('/navigation/model.json',   FalcorServer.dataSourceRoute(() => new NavigationRouter()));
app.use('/user/model.json',         FalcorServer.dataSourceRoute(() => new UserRouter()));

// express routers
// page '/user'
app.use('/', userRouter);

// static pages
app.use(express.static('./public'));

/* 404 */
app.use(function(req, res, next) {
    var err = new Error('Url is not found! ::: ' + req.url);
    err.status = 404;
    next(err);
});

module.exports = app;