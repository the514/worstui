'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GetColumnTpl = require('./GetColumnTpl');

var _GetColumnTpl2 = _interopRequireDefault(_GetColumnTpl);

var _antd = require('antd');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 查看数据模态框
var ShowModel = function (_Component) {
  _inherits(ShowModel, _Component);

  function ShowModel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ShowModel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ShowModel.__proto__ || Object.getPrototypeOf(ShowModel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      model: [],
      modelName: [],
      data: []
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ShowModel, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: 'render',
    value: function render() {
      var dataSource = this.props.dataSource;
      var modelId = this.props.dataSource.id;
      var columns = this.props.columns;
      var dataArr = [];
      var projectUrl = this.props.url;
      var updateList = this.props.updateList;

      var columnObj = {};
      _jquery2.default.each(columns, function (index, val) {
        _jquery2.default.each(columns[index], function (k, v) {
          if (k === "key" && columns[index].title !== undefined && columns[index].showHidden !== true) {
            columnObj[v] = {
              title: columns[index].title,
              key: columns[index][k],
              keyName: columns[index].keyName,
              isLocal: columns[index].isLocal
            };
          }
        });
      });

      // console.log(columnObj);
      // console.log(dataSource);

      if (dataSource !== null) {

        _jquery2.default.each(dataSource, function (k, v) {
          // console.log(dataSource);

          if (columnObj[k] !== undefined) {

            // console.log(columnObj[k]["keyName"]);
            // console.log(dataSource[columnObj[k]["keyName"]]);
            // console.log(dataSource);
            dataArr.push({
              title: columnObj[k].title,
              key: columnObj[k].key,
              data: (0, _GetColumnTpl2.default)(k, // 字段名称
              v, // 模型名称
              v, // 默认值
              "show", // 样式类型 [add, show, edit]
              projectUrl, // 项目地址
              modelId, // 数据id
              updateList, // updataList 回调函数
              dataSource[columnObj[k]["keyName"] !== undefined ? columnObj[k]["keyName"] : ""], // 分类解释数据字段名
              columnObj[k].isLocal) // 是否是本地解释数据
            });
          }

          // console.log(columns);
        });
      }
      // $.each(columns, function(index, val) {
      //   $.each(columns[index], function(k, v) {
      //     console.log(columns[index].showHidden);
      //   });
      // });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Modal,
          {
            className: 'showModel',
            visible: this.props.visible,
            title: this.props.title,
            width: 1200,
            style: { height: "90%", overflow: "hidden", top: "40px" },
            okText: '\u5173\u95ED',
            onCancel: this.props.onCancel,
            footer: null
          },
          _react2.default.createElement(
            'div',
            { className: 'showbd' },
            dataArr && dataArr.map(function (elem) {
              return _react2.default.createElement(
                'div',
                { key: elem.key },
                _react2.default.createElement(
                  'span',
                  null,
                  elem.title
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'bd' },
                  elem.data
                )
              );
            })
          )
        )
      );
    }
  }]);

  return ShowModel;
}(_react.Component);

exports.default = ShowModel;