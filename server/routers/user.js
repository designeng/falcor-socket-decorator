import express from 'express';
const router  = express.Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';

var Falcor = require('falcor');
var FalcorDataSource = require('falcor-http-datasource');

import User from '../../example/users';

// does not render list items, just empty ul tag
router.get('/users', function(req, res) {
    res.send('<!doctype html><body>\n' +
        ReactDOMServer.renderToString(<User />) +
        '</body></html>'
    );
    console.log("/user data sent");
});

// model directly
router.get('/test', function(req, res) {
    var model = new Falcor.Model({
        source: new FalcorDataSource('/user/model.json')
    });

    model.getValue(['users'])
        .then(response => {
            console.log("RESPONSE:::::", response);
            res.end(JSON.stringify(response));
            console.log("/test data sent");
        }, (err) => console.log("ERROR::::", err))
});

module.exports = router;