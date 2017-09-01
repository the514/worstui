'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Config = require('./Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import axios from 'axios';

// import Config from '../../../src/Modules/Config';


var hope = ""; // 有些变量不是拿来用的, 是值得占有一部分内存的希望.

var Global = function (_Component) {
  _inherits(Global, _Component);

  function Global() {
    _classCallCheck(this, Global);

    return _possibleConstructorReturn(this, (Global.__proto__ || Object.getPrototypeOf(Global)).apply(this, arguments));
  }

  _createClass(Global, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }], [{
    key: 'getUrl',
    value: function getUrl() {
      return _Config2.default.globalUrl();
    }
  }, {
    key: 'getFileUrl',
    value: function getFileUrl() {
      return _Config2.default.globalUrl();
    }
  }, {
    key: 'columnsDataSource',
    value: function columnsDataSource(key) {
      return _Config2.default.columnsDataSource(key);
    }
  }, {
    key: 'setTokenHeader',
    value: function setTokenHeader(response) {
      localStorage.setItem("admin-access-token", response.headers["access-token"]);
      localStorage.setItem("admin-client", response.headers["client"]);
      localStorage.setItem("admin-uid", response.headers["uid"]);
      localStorage.setItem("admin-expiry", response.headers["expiry"]);
    }
  }, {
    key: 'setLoginTokenHeader',
    value: function setLoginTokenHeader(response) {
      localStorage.removeItem("admin-access-token");
      localStorage.removeItem("admin-client");
      localStorage.removeItem("admin-uid");
      localStorage.removeItem("admin-expiry");

      // if (response.headers["uid"]==="1") {
      //   localStorage.setItem("admin-access-token", response.headers["access-token"]);
      //   localStorage.setItem("admin-client", response.headers["client"]);
      //   localStorage.setItem("admin-uid", response.headers["uid"]);
      //   localStorage.setItem("admin-expiry", response.headers["expiry"]);
      // }
      localStorage.setItem("admin-access-token", response.headers["access-token"]);
      localStorage.setItem("admin-client", response.headers["client"]);
      localStorage.setItem("admin-uid", response.headers["uid"]);
      localStorage.setItem("admin-expiry", response.headers["expiry"]);
    }
  }, {
    key: 'signOut',
    value: function signOut(response) {
      localStorage.removeItem("admin-access-token");
      localStorage.removeItem("admin-client");
      localStorage.removeItem("admin-uid");
      localStorage.removeItem("admin-expiry");
      window.location.hash = "#login";
    }
  }, {
    key: 'getHeader',
    value: function getHeader() {
      return {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'access-token': localStorage.getItem("admin-access-token"),
          'client': localStorage.getItem("admin-client"),
          'uid': localStorage.getItem("admin-uid"),
          'expiry': localStorage.getItem("admin-expiry"),
          'token-type': 'Bearer'
        }
      };
    }
  }, {
    key: 'getAuth',
    value: function getAuth(props) {
      if (props.response) {
        console.log(props.response);
        if (props.response.status === 401) {
          if (localStorage.getItem("admin-access-token")) {
            Global.openNotification({ type: "error", title: "账号认证失败", body: "请重新登录！" });
          }
          window.location.hash = "#login";
          (0, _jquery2.default)(".loading").fadeOut();
        }
      } else {
        Global.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
      }
    }
  }, {
    key: 'openNotification',
    value: function openNotification(props) {
      _antd.notification[props.type]({
        message: props.title,
        description: props.body
      });
    }
  }, {
    key: 'getToken',
    value: function getToken() {
      var token = "";
      if (localStorage.getItem("token")) {
        token = "?token=" + localStorage.getItem("token");
      }
      return token;
    }
  }]);

  return Global;
}(_react.Component);

Global.LoadingStart = function () {
  (0, _jquery2.default)(".loading").fadeIn();
};

Global.LoadingEnd = function () {
  (0, _jquery2.default)(".loading").fadeOut();
};

exports.default = Global;