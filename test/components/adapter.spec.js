import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';

import config from '../fixtures/config';
import socketIoDecorator from '../../source';

// because of "/socket.io/socket.io.js" attachment in index.html provides global
global.io = () => {}

class NoopComponent extends React.Component {
    render() {
        return <div></div>
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
        expect(decorated.state.socket).not.to.be.null;
    });

});