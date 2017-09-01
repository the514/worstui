'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./login.css');

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Config = require('../Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Config from '../../../../src/Modules/Config';


function LoginTpl(props) {

  var divStyle = {
    display: 'none'
  };

  return _react2.default.createElement(
    'div',
    { className: 'sign_in' },
    _react2.default.createElement(
      'div',
      { className: 'container-fluid' },
      _react2.default.createElement(
        'h1',
        null,
        _Config2.default.projectCn().title,
        ' \xB7 \u767B\u5F55'
      ),
      _react2.default.createElement(
        'div',
        { className: 'sign-in-form' },
        _react2.default.createElement(
          'div',
          { className: 'sign-in-top' },
          _react2.default.createElement('div', { className: 'border-left' }),
          _react2.default.createElement('div', { className: 'border-right' }),
          _react2.default.createElement(
            'div',
            { className: 'logo' },
            _react2.default.createElement('img', { alt: 'logo', src: '/static/images/noavatar.png' })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'sign-in-bottom' },
          _react2.default.createElement(
            'div',
            { className: 'bd' },
            _react2.default.createElement(
              'div',
              { id: 'alert', style: divStyle },
              _react2.default.createElement('i', { className: 'fa fa-exclamation-circle' }),
              '\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF'
            ),
            _react2.default.createElement(
              'form',
              { className: 'new_user', id: 'new_user', method: 'post' },
              _react2.default.createElement(
                'div',
                { className: 'field' },
                _react2.default.createElement('i', { className: 'fa fa-user' }),
                _react2.default.createElement('input', { placeholder: '\u7528\u6237\u540D', type: 'text', value: props.stateMobile || '', name: 'user[login]', id: 'user_login', onChange: props.mobile })
              ),
              _react2.default.createElement(
                'div',
                { className: 'field' },
                _react2.default.createElement('i', { className: 'fa fa-lock' }),
                _react2.default.createElement('input', { autoComplete: 'off', placeholder: '\u5BC6\u7801', value: props.statePassword || '', type: 'password', name: 'user[password]', id: 'user_password', onChange: props.password })
              ),
              _react2.default.createElement(
                'div',
                { className: 'actions' },
                _react2.default.createElement('input', { type: 'button', value: '\u767B\u5F55', onClick: props.onSubmit })
              )
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'copyright' },
        _react2.default.createElement(
          'p',
          null,
          _Config2.default.projectCn().copyright
        )
      )
    )
  );
}

var Login = function (_Component) {
  _inherits(Login, _Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this, props));

    _this.onSubmit = function (e) {

      var params = {
        account_text: _this.state.mobile,
        password_text: _this.state.password

        // const config = Global.getHeader();
      };var config = {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'token-type': 'Bearer',
          'access-token': '',
          'client': '',
          'uid': '',
          'expiry': ''
        }
      };

      console.log(_Global2.default.getUrl() + _Config2.default.loginUrl());

      _Global2.default.LoadingStart();
      _axios2.default.post(_Global2.default.getUrl() + _Config2.default.loginUrl(), params, config).then(function (response) {
        console.log(response);
        console.log(response.headers);
        console.log(config);
        _Global2.default.setLoginTokenHeader(response);

        _Global2.default.LoadingEnd();
        if (localStorage.getItem("admin-access-token")) {
          window.location.href = "./";
        }
      }).catch(function (error) {
        console.log(error);
        _Global2.default.openNotification({ type: "error", title: "账号或密码错误", body: "请重试登录！" });
        _Global2.default.LoadingEnd();
      });
    };

    _this.mobile = _this.mobile.bind(_this);
    _this.password = _this.password.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);

    _this.state = {
      mobile: "",
      password: "",
      headers: {}
    };

    return _this;
  }

  _createClass(Login, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _jquery2.default)("title").text(_Config2.default.projectCn().title);
      // const config = {
      //   headers: {
      //     // 'Content-type': 'application/json',
      //     'Accept': 'application/json',
      //     'access-token': localStorage.getItem("admin-access-token"),
      //     'client': localStorage.getItem("admin-client"),
      //     'uid': localStorage.getItem("admin-uid"),
      //     'expiry': localStorage.getItem("admin-expiry"),
      //     'token-type': 'Bearer'
      //   }
      // };

      // Global.LoadingStart();
      // axios.get(Global.getUrl() + products_url, config)
      //   .then(response => {
      //     console.log(config);
      //     Global.LoadingEnd();
      //     window.location.href = "./";
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     // Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
      //     Global.LoadingEnd();
      //   });

      (0, _jquery2.default)(document).ready(function () {
        setTimeout(function () {
          var window_height = (0, _jquery2.default)(window).height();
          var form_height = (0, _jquery2.default)(".sign-in-form").height();

          if (window_height > 0) {
            (0, _jquery2.default)(".sign-in-form").css("marginTop", (window_height - form_height - 50) / 2 + "px").fadeIn();
          }
        }, 300);
      });

      var $this = this;
      (0, _jquery2.default)(".actions").parents("form").keydown(function (event) {
        if (event.which === 13) {
          $this.onSubmit(event);
        }
      });
    }
  }, {
    key: 'mobile',
    value: function mobile(e) {
      this.setState({ mobile: e.target.value });
    }
  }, {
    key: 'password',
    value: function password(e) {
      this.setState({ password: e.target.value });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(LoginTpl, { mobile: this.mobile, password: this.password, stateMobile: this.state.mobile, statePassword: this.state.password, onSubmit: this.onSubmit });
    }
  }]);

  return Login;
}(_react.Component);

exports.default = Login;