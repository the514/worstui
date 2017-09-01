'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu;

var Config = function (_Component) {
  _inherits(Config, _Component);

  function Config(props) {
    _classCallCheck(this, Config);

    return _possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).call(this, props));
  }

  _createClass(Config, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);

  return Config;
}(_react.Component);

Config.logo = function () {
  return window.worstui_logo;
};

Config.projectCn = function () {
  return window.worstui_projectCn;
};

Config.router = function () {
  return window.worstui_router;
};

Config.nav = function (thisClass) {
  window.worstui_nav(thisClass);
};

Config.navTpl = function (thisClass) {
  return window.worstui_navTpl(thisClass);
};

Config.globalUrl = function () {
  return window.worstui_globalUrl; // server side ip
};

Config.uploadImgUrl = function () {
  return window.worstui_uploadImgUrl;
};

Config.uploadImgColumnName = function () {
  return window.worstui_uploadImgColumnName;
};

Config.loginUrl = function () {
  return window.worstui_loginUrl;
};

Config.jsonRequestType = function () {
  return window.worstui_jsonRequestType; // object:纯对象, model:model{参数}
};

Config.columnsDataSource = function (key) {
  return window.worstui_columnsDataSource(key);
};

exports.default = Config;