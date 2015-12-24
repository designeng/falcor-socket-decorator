import Falcor from "falcor";
import FalcorDataSource from 'falcor-http-datasource';
import React, { PropTypes } from "react";

export default function(config) {

    if (!config.sourcePath) {
        throw new Error('Falcor model sourcePath should be provided!');
    }

    const model = new Falcor.Model({
        source: new FalcorDataSource(config.sourcePath)
    });

    return function(component) {
        const Component = component;

        Component.contextTypes = {
            model: PropTypes.object.isRequired
        };

        return class ConnectModelComponent extends React.Component {

            constructor(props, context) {
                super(props, context);
                this.state = { model: model };
            }

            static childContextTypes = {
                model: React.PropTypes.object.isRequired
            };

            getChildContext() {
                return { model: this.state.model };
            }

            componentWillMount() {
                console.log("componentWillMount:::::", this.context);

                if (config.getValue) {
                    model.getValue([config.getValue])
                        .then(response => {
                            this.refs.childComponent.setState({ [config.getValue]: response });
                        },
                        (error) => console.log("ERROR [connect-data-decorator]: ", error));
                }
            }

            render() {
                return <Component {...this.props} ref="childComponent" />;
            }

        };
    };
}