import React from 'react';
import ReactDom from 'react-dom';
import { expect } from 'chai';

import Navigation from '../../example/navigation';

describe('rendering', () => {

    let root = {}

    const before = () => {
        root._rootElement = document.createElement("div");
        document.body.appendChild(root._rootElement);
    }

    beforeEach(before);

    it('should render navigation component with empty list', () => {
        ReactDom.render(<Navigation />, root._rootElement);
        expect(document.querySelector('ul').innerHTML).to.equal('');
    });
});