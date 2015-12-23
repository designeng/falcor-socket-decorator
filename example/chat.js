import React from 'react';
import connectModel from 'connect-data-decorator';
import config from './config';
import socket from '../source';

@socket({ host: config.socketio.host })
export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {users: []};
    }

    render() {
        this.context.socket.emit('chat_rendered', { my: 'data123' });
        return <div>CHAT COMPONENT</div>;
    }
}