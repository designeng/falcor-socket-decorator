import express from 'express';
let router  = express.Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import User from '../../../../source/user';

router.get('/user', function(req, res) {
    res.send('<!doctype html><body>\n' +
        ReactDOMServer.renderToString(<User />) +
        '</body></html>'
    );
});

module.exports = router;