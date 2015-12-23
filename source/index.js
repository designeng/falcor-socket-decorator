import React, { PropTypes } from "react";

export default function socketIoDecorator(config) {

    if (!config.host) {
        throw new Error('[ERROR socketIoDecorator] Host should be provided!');
    }

    try {
        var socket = io(config.host);
    } catch (error) {
        throw new Error('[ERROR socketIoDecorator] ' + error);
    }

    return function(component) {
        const Component = component;

        Component.contextTypes = {
            socket: PropTypes.object.isRequired
        };

        return class ConnectModelComponent extends React.Component {

            constructor(props) {
                super(props);
                this.state = { socket: socket };
            }

            static childContextTypes = {
                socket: React.PropTypes.object.isRequired
            };

            getChildContext() {
                return { socket: this.state.socket };
            }

            render() {
                return <Component {...this.props} />;
            }

        };
    };
}