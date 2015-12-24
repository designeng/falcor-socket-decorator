import React from 'react';
import connectModel from 'connect-data-decorator';

@connectModel({
    sourcePath  : '/user/model.json',
    getValue    : 'users'
})
export default class Users extends React.Component {
    constructor() {
        super();
        this.state = {users: []};
    }

    render() {
        let users = this.state.users;
        console.log("USERS::::::", users);
        
        users = Object.keys(users).map(idx => {
            return <li key={ idx }>
                <a href={ "#" + users[idx].href } >
                    { users[idx].name }
                </a></li>;
        });

        return <ul>{ users }</ul>;
    }
}