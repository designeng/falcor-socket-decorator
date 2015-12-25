import React from 'react';
import callbackRegister from "react-callback-register"

@callbackRegister
export default class Interactive extends React.Component {

    @callbackRegister.on('mouseDown')
    activate(e) {
        this.props.activate(e)
    }

    render() {
        const {activate, ...other} = this.props;

        return (
            <div {...other} {...this.callbacks}>
                Interactive
            </div>
        )
    }
}