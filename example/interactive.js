import React from 'react';
import callbackRegister from "react-callback-register"
import connectModel from 'connect-data-decorator';

// connectModel & callbackRegister together
@connectModel({
    sourcePath  : '/users/model.json',
    getValue    : 'users'
})
@callbackRegister
export default class Interactive extends React.Component {

    constructor() {
        super();
        this.state = {users: []};
    }

    @callbackRegister.on('mouseDown')
    activate(e) {
        this.props.activate(e)
    }

    render() {
        let users = this.state.users;
        const {activate, ...other} = this.props;
        
        users = Object.keys(users).map(idx => {
            return <li key={ idx }>
                <a href={ "#" + users[idx].href } >
                    { users[idx].name }
                </a></li>;
        });

        return (
            <div>
                <div {...other} {...this.callbacks}>User List</div>
                <ul>{ users }</ul>
            </div>
        );
    }
}