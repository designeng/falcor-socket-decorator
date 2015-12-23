import { Router } from 'express';
const router  = Router();
import React from 'react';
import ReactDOMServer from 'react-dom/server';

let chatHandler = function(req, res) {
    res.send("CHAT");
}

export default (io) => {

    io.on('connection', function (socket) {

        console.log("connection:::::::::::");

        chatHandler = (req, res) => {
            res.send("CHAT connection");
        }

        socket.emit('news', { hello: 'world' });
        
        socket.on('chat_rendered', function (data) {
            console.log(data);
        });
    });

    router.get('/chat', chatHandler);

    return router;
}