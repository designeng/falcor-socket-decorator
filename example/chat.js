import React from 'react';
import connectModel from 'connect-data-decorator';

var socket = io('http://localhost');

export default class Chat extends React.Component {
    constructor() {
        super();
        this.state = {users: []};
    }

    render() {
        socket.emit('chat_rendered', { my: 'data' });
        return <div>CHAT COMPONENT</div>;
    }
}