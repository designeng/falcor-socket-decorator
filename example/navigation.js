import React, { PropTypes } from 'react';

import connectModel from 'connect-data-decorator';

@connectModel({ 
    sourcePath  : '/navigation/model.json',
    getValue    : 'items'
})
export default class Navigation extends React.Component {

    constructor() {
        super();
        this.state = {items: []};
    }

    render() {
        let items = this.state.items;
        items = Object.keys(items).map(idx => {
            return <li key={ idx }>
                <a href={ "#" + items[idx].href } >
                    { items[idx].name }
                </a></li>;
        });
        return <ul>{ items }</ul>;
    }
}