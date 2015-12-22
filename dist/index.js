"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (config) {

    if (!config.sourcePath) {
        throw new Error('Falcor model sourcePath should be provided!');
    }

    var model = new _falcor2.default.Model({
        source: new _falcorHttpDatasource2.default(config.sourcePath)
    });

    return function (component) {
        var _class, _temp;

        var Component = component;

        Component.contextTypes = {
            model: _react.PropTypes.object.isRequired
        };

        return _temp = _class = (function (_React$Component) {
            _inherits(ConnectModelComponent, _React$Component);

            function ConnectModelComponent(props) {
                _classCallCheck(this, ConnectModelComponent);

                var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectModelComponent).call(this, props));

                _this.state = { model: model };
                return _this;
            }

            _createClass(ConnectModelComponent, [{
                key: "getChildContext",
                value: function getChildContext() {
                    return { model: this.state.model };
                }
            }, {
                key: "componentWillMount",
                value: function componentWillMount() {
                    var _this2 = this;

                    if (config.getValue) {
                        model.getValue([config.getValue]).then(function (response) {
                            _this2.refs.childComponent.setState(_defineProperty({}, config.getValue, response));
                        });
                    }
                }
            }, {
                key: "render",
                value: function render() {
                    return _react2.default.createElement(Component, _extends({}, this.props, { ref: "childComponent" }));
                }
            }]);

            return ConnectModelComponent;
        })(_react2.default.Component), _class.childContextTypes = {
            model: _react2.default.PropTypes.object.isRequired
        }, _temp;
    };
};

var _falcor = require("falcor");

var _falcor2 = _interopRequireDefault(_falcor);

var _falcorHttpDatasource = require("falcor-http-datasource");

var _falcorHttpDatasource2 = _interopRequireDefault(_falcorHttpDatasource);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
