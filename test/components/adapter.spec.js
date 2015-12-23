import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';

import socketAdapter from '../../source';

class NoopComponent extends React.Component {
    render() {
        return <div></div>
    }
}

describe('socket.io adapter',  () => {

    let root = {}

    const before = () => {
        root._rootElement = document.createElement("div");
        document.body.appendChild(root._rootElement);
    }

    beforeEach(before);

    it('should throw error with zero config', () => {
        try {
            let connection = new connectModel({});
        } catch (error) {
            expect(error.message).to.be.a('string');
            expect(error.message).to.equal('Falcor model sourcePath should be provided!');
        }
    });

    it('instance should be instance of react component class', () => {
        let connection = connectModel({ sourcePath: '/navigation/model.json' })(NoopComponent);
        expect(new connection).to.be.an.instanceof(React.Component);
    });

    it('instance should have model in state object', () => {
        const Component = connectModel({ sourcePath: '/navigation/model.json' })(NoopComponent);
        let component = new Component();
        expect(component.state.model).not.to.be.null;
    });

});