import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';

import config from '../fixtures/config';
import socketIoDecorator from '../../source';

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

describe('socket.io decorator',  () => {

    let root = {}

    const before = () => {
        root._rootElement = document.createElement("div");
        document.body.appendChild(root._rootElement);
    }

    beforeEach(before);

    it('should throw error with zero config', () => {
        try {
            new socketIoDecorator({});
        } catch (error) {
            expect(error.message).to.be.a('string');
            expect(error.message).to.equal('[ERROR socketIoDecorator] Host should be provided!');
        }
    });

    it('instance should be instance of react component class', () => {
        const Decor = socketIoDecorator({ host: config.socketio.host })(NoopComponent);
        expect(new Decor).to.be.an.instanceof(React.Component);
    });

    it('instance should have socket in state object', () => {
        const Decor = socketIoDecorator({ host: config.socketio.host })(NoopComponent);
        let decorated = new Decor();
        expect(decorated.state.socket).to.be.ok;
    });

    it('should render socket ok info', () => {
        ReactDom.render(<Chat />, root._rootElement);
        expect(document.querySelector('#chat').innerHTML).to.equal('1');
    });

});