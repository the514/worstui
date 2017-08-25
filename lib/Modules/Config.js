'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _antd = require('antd');

var _logo = require('./logo.svg');

var _logo2 = _interopRequireDefault(_logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu;

var Config = function (_Component) {
  _inherits(Config, _Component);

  function Config() {
    _classCallCheck(this, Config);

    return _possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).apply(this, arguments));
  }

  _createClass(Config, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null);
    }
  }]);

  return Config;
}(_react.Component);

Config.logo = function () {
  return _logo2.default;
};

Config.projectCn = function () {
  return {
    title: "website title",
    copyright: "website name ©2017 Created by company name"
  };
};

Config.router = function () {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_reactRouter.Route, { exact: true, path: '/' })
  );
};

Config.nav = function (thisClass) {
  if (window.location.hash === "#/") {

    // thisClass.setState({ openKeys: ['sub1'] });
    // or
    // thisClass.setState({ openKeys: [''] });

  }
};

Config.navTpl = function (thisClass) {
  return _react2.default.createElement(
    _antd.Menu,
    {
      theme: 'light',
      mode: thisClass.state.mode,
      openKeys: thisClass.state.openKeys,
      selectedKeys: thisClass.state.selectedKeys,
      onSelect: thisClass.selectMenu,
      defaultOpenKeys: thisClass.state.openKeys,
      defaultSelectedKeys: thisClass.state.selectedKeys,
      onOpenChange: thisClass.onOpenChange
    },
    _react2.default.createElement(
      SubMenu,
      {
        key: 'sub1',
        title: _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'user' }),
          _react2.default.createElement(
            'span',
            { className: 'nav-text' },
            '\u7528\u6237\u7BA1\u7406'
          )
        )
      },
      _react2.default.createElement(
        _antd.Menu.Item,
        { key: '#/' },
        '\u7528\u6237\u7BA1\u7406'
      )
    )
  );
};

Config.globalUrl = function () {
  return "http://192.168.0.233:3001"; // server side ip
};

Config.uploadImgUrl = function () {
  return "/pictures";
};

Config.uploadImgColumnName = function () {
  return "picture[file_img]";
};

Config.loginUrl = function () {
  return "/auth/sign_in";
};

Config.jsonRequestType = function () {
  return "model"; // object:纯对象, model:model{参数}
};

Config.columnsDataSource = function (key) {
  if (key === "category_select" || key === "q[category_select_eq]") {

    return {
      modelUrl: "/categories",
      modelDataKey: "name_text",
      modelDataValue: "id",
      modelDataPlaceholder: "请选择分类",
      modelDataFilterText: "全部分类"
    };
  } else if (key === "sex_select") {

    return {
      modelJson: {
        "list": [{
          "id": 1,
          "name_text": "男"
        }, {
          "id": 2,
          "name_text": "女"
        }]
      },
      modelDataKey: "name_text",
      modelDataValue: "id",
      modelDataPlaceholder: "请选择性别"
    };
  } else if (key === "user_type_select") {

    return {
      modelUrl: "/user_types",
      modelDataKey: "name_text",
      modelDataValue: "id",
      modelDataPlaceholder: "请选择用户类型"
    };
  } else if (key === "area_id") {

    return {
      modelUrl: "/areas",
      modelDataKey: "name_text",
      modelDataValue: "id",
      modelDataPlaceholder: "请选择所在小区"
    };
  } else if (key === "building_id") {

    return {
      modelDataLinkage: true,
      modelUrl: ["/areas", "/buildings"],
      modelDataKey: ["name_text", "name_text"],
      modelDataValue: ["id", "id"],
      modelDataPlaceholder: ["请选择小区", "请选择楼栋"],
      modelDataColumn: ["area_id", "id"],
      modelDataParams: ["", "q[area_id_eq]"]
    };
  } else if (key === "unit_id" || key === "q[unit_id_eq]") {

    return {
      modelDataLinkage: true,
      modelUrl: ["/areas", "/buildings", "/units"],
      modelDataKey: ["name_text", "name_text", "name_text"],
      modelDataValue: ["id", "id", "id"],
      modelDataPlaceholder: ["请选择小区", "请选择楼栋", "请选择单元号"],
      modelDataFilterText: ["全部小区", "全部楼栋", "全部单元号"],
      modelDataFilterKey: ["q[area_id_eq]", "q[building_id_eq]", "q[unit_id_eq]"],
      modelDataColumn: ["area_id", "building_id", "id"],
      modelDataParams: ["", "q[area_id_eq]", "q[building_id_eq]"]
    };
  } else if (key === "role_id") {

    return {
      modelUrl: "/roles",
      modelDataKey: "name_text",
      modelDataValue: "id",
      modelDataPlaceholder: "请选择用户组"
    };
  } else if (key === "user_workflow_state") {

    return {
      url: '/users',
      state: {
        new: {
          text: "待审核",
          button: [{
            text: "审核",
            action: "accept",
            result: "accepted",
            tips: "商品已审核"
          }, {
            text: "拒绝审核",
            action: "reject",
            result: "rejected",
            tips: "商品审核已驳回"
          }]
        },
        accepted: {
          text: "已审核",
          button: [{
            text: "拒绝审核",
            action: "reject",
            result: "rejected",
            tips: "商品审核已驳回"
          }]
        },
        rejected: {
          text: "审核拒绝",
          button: [{
            text: "审核",
            action: "accept",
            result: "accepted",
            tips: "商品已审核"
          }]
        }
      }
    };
  }
};

exports.default = Config;
//# sourceMappingURL=Config.js.map