import React from 'react';
import { render } from 'react-dom';
import Navigation from './navigation'
import Chat from './chat'
import Users from './users'
import Interactive from './interactive'

const activateCallback = () => {
    console.log("activateCallback invoked");
}

export default class Application extends React.Component {
    render() {
        return (
            <div id="app-wrapper">
                <Navigation />
                <Chat />
                <Users />
                <Interactive activate={activateCallback} />
            </div>
        )
    }
}

render(<Application />, document.querySelector('#application'));