'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 图片模态框
var ImgModal = function (_Component) {
  _inherits(ImgModal, _Component);

  function ImgModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ImgModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ImgModal.__proto__ || Object.getPrototypeOf(ImgModal)).call.apply(_ref, [this].concat(args))), _this), _this.state = { visible: false }, _this.showModal = function () {
      _this.setState({
        visible: true
      });
    }, _this.handleCancel = function () {
      return _this.setState({ visible: false });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ImgModal, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('img', { src: this.props.imgSrc, style: { cursor: "pointer" }, alt: '\u7F29\u7565\u56FE', height: this.props.height, onClick: this.showModal }),
        _react2.default.createElement(
          _antd.Modal,
          {
            wrapClassName: 'vertical-center-modal',
            width: "auto",
            footer: null,
            visible: this.state.visible,
            onCancel: this.handleCancel
          },
          _react2.default.createElement('img', { src: this.props.imgSrc, alt: '\u8BE6\u60C5\u56FE', style: { width: "100%" } })
        )
      );
    }
  }]);

  return ImgModal;
}(_react.Component);

exports.default = ImgModal;
//# sourceMappingURL=ImgModal.js.map