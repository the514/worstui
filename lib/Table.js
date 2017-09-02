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

var _Global = require('./Global');

var _Global2 = _interopRequireDefault(_Global);

var _Config = require('./Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Config from '../../../src/Modules/Config';


var Sider = _antd.Layout.Sider,
    Footer = _antd.Layout.Footer;
// const SubMenu = Menu.SubMenu;

var ButtonGroup = _antd.Button.Group;

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.onOpenChange = function (openKeys) {

      // console.log(openKeys);
      var state = _this.state;
      var latestOpenKey = openKeys.find(function (key) {
        return !(state.openKeys.indexOf(key) > -1);
      });
      var latestCloseKey = state.openKeys.find(function (key) {
        return !(openKeys.indexOf(key) > -1);
      });

      var nextOpenKeys = [];
      if (latestOpenKey) {
        nextOpenKeys = _this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
      }
      if (latestCloseKey) {
        nextOpenKeys = _this.getAncestorKeys(latestCloseKey);
      }
      _this.setState({ openKeys: nextOpenKeys });
    };

    _this.signOut = function () {
      _Global2.default.signOut();
    };

    _this.getAncestorKeys = function (key) {
      var map = {};
      return map[key] || [];
    };

    _this.onCollapse = function (collapsed, type) {
      // console.log(collapsed);
      // console.log(type);
      _this.setState({
        collapsed: collapsed,
        mode: collapsed ? 'vertical' : 'inline',
        signOutButton: collapsed ? 'none' : 'block'
      });
    };

    _this.state = {
      selectedKeys: ['#'],
      openKeys: ['sub1'],
      collapsed: false,
      signOutButton: "block",
      mode: 'inline',
      currentHash: "#/",
      currentTitle: "",
      tableTpl: null
    };

    _this.selectMenu = _this.selectMenu.bind(_this);
    _this.signOut = _this.signOut.bind(_this);
    return _this;
  }

  _createClass(Table, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        selectedKeys: [window.location.hash],
        openKeys: this.props.openKeys ? this.props.openKeys : []
      });

      (0, _jquery2.default)("title").text(_Config2.default.projectCn().title);

      _Config2.default.nav(this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props) {
      // console.log(window.location.hash);
    }
  }, {
    key: 'selectMenu',


    // onSelect( item, key, selectedKeys ) { 
    //   console.log(item);
    //   console.log(key);
    //   console.log(selectedKeys);
    // }

    value: function selectMenu(item) {
      // console.log(item);
      // console.log(item.item.props.title);
      this.setState({ selectedKeys: [item.key] });
      window.location.hash = item.key;
    }
  }, {
    key: 'render',
    value: function render() {
      var logoStyle = {
        display: 'block',
        margin: '0 auto'
      };

      return _react2.default.createElement(
        _antd.Layout,
        { style: { width: '100%', height: '100%', position: 'absolute', overflow: 'hidden' } },
        _react2.default.createElement(
          Sider,
          {
            collapsible: true,
            collapsed: this.state.collapsed,
            onCollapse: this.onCollapse,
            style: { background: '#fff', transition: 'none' }
          },
          _react2.default.createElement(
            'div',
            { className: 'logo' },
            _react2.default.createElement('img', { src: _Config2.default.logo(), width: '35', alt: 'logo', style: logoStyle })
          ),
          _react2.default.createElement(
            'div',
            { className: 'user', style: { width: "100%", textAlign: "center", marginBottom: "20px", display: this.state.signOutButton } },
            _react2.default.createElement(
              ButtonGroup,
              null,
              _react2.default.createElement(
                _antd.Button,
                null,
                localStorage.getItem("admin-uid") ? localStorage.getItem("admin-uid") === "1" ? "admin" : localStorage.getItem("admin-uid") : "无"
              ),
              _react2.default.createElement(
                _antd.Button,
                { type: 'primary', icon: 'poweroff', onClick: this.signOut },
                '\u9000\u51FA'
              )
            )
          ),
          _Config2.default.navTpl(this)
        ),
        _react2.default.createElement(
          _antd.Layout,
          { className: 'animate-content', style: { overflow: 'auto' } },
          _Config2.default.router(),
          _react2.default.createElement(
            Footer,
            { style: { textAlign: 'center' } },
            _Config2.default.projectCn().copyright
          )
        )
      );
    }
  }]);

  return Table;
}(_react.Component);

exports.default = Table;