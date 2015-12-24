import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';

import config from '../fixtures/config';
import socketIoDecorator    from '../../source';
import connectModel         from '../../source/connectModel';

// because of "/socket.io/socket.io.js" attachment in index.html provides global
global.io = () => {}

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
        var isSocket = this.state.socket? 1 : 0;
        return <div id="chat">{ isSocket }</div>
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

    it('should render with truthy socket info', () => {
        ReactDom.render(<Chat />, root._rootElement);
        expect(document.querySelector('#chat').innerHTML).to.equal('1');
    });

});