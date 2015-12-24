import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';

import config from '../fixtures/config';
import socketIoDecorator    from '../../source';
import connectModel         from '../../source/connectModel';

class Socket {
    constructor() {
    }

    emit(channel, data){
        return 1;
    }
}

// because of "/socket.io/socket.io.js" attachment in index.html provides global
global.io = () => {
    return new Socket();
}

class NoopComponent extends React.Component {
    render() {
        return <div></div>
    }
}

@socketIoDecorator({ host: config.socketio.host })
// @connectModel({
//     sourcePath  : '/users/model.json',
//     getValue    : 'users'
// })
class Chat extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        var socket = this.context.socket;
        var emitted = socket.emit('chat_rendered', { my: 'data123' });
        return <div id="chat">{ emitted }</div>
    }
}

describe('socket.io decorator composition',  () => {

    let root = {}

    const before = () => {
        root._rootElement = document.createElement("div");
        document.body.appendChild(root._rootElement);
    }

    beforeEach(before);

    // passed
    xit('instance should be instance of react component class', () => {
        var connection = connectModel({
            sourcePath  : '/users/model.json',
            getValue    : 'users'
        })(NoopComponent);

        const Decor = socketIoDecorator({ host: config.socketio.host })(connection);
        expect(new Decor).to.be.an.instanceof(React.Component);
    });

    // passed
    xit('instance should have socket in state object', () => {
        var connection = connectModel({
            sourcePath  : '/users/model.json',
            getValue    : 'users'
        })(Chat);

        const Decor = socketIoDecorator({ host: config.socketio.host })(connection);
        let decorated = new Decor();
        expect(decorated.state.socket).to.be.ok;
    });

    it('should render socket ok info', () => {
        ReactDom.render(<Chat />, root._rootElement);
        expect(document.querySelector('#chat').innerHTML).to.equal('1');
    });

});