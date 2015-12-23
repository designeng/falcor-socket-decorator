import React from 'react';
import { render } from 'react-dom';
import Navigation from './navigation'
import Chat from './chat'
import Users from './users'

export default class Application extends React.Component {
    render() {
        return (
            <div id="app-wrapper">
                <Navigation />
                <Chat />
                <Users />
            </div>
        )
    }
}

render(<Application />, document.querySelector('#application'));