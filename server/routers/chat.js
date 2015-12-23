import { Router } from 'express';
const router  = Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export default (io) => {
    router.get('/chat', function(req, res) {
        res.send("CHAT");
    });

    return router;
}