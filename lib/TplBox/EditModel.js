'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GetColumnTpl = require('./GetColumnTpl');

var _GetColumnTpl2 = _interopRequireDefault(_GetColumnTpl);

var _Config = require('../Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import GetColumnConfig from './GetColumnConfig'; // 字段配置


var FormItem = _antd.Form.Item;

// 添加新数据模态框

var EditModel = function (_Component) {
  _inherits(EditModel, _Component);

  function EditModel(props) {
    _classCallCheck(this, EditModel);

    var _this = _possibleConstructorReturn(this, (EditModel.__proto__ || Object.getPrototypeOf(EditModel)).call(this, props));

    _this.state = {
      model: [],
      modelName: [],
      newKey: props.key,
      data: {},
      visible: false,
      formItems: []
    };
    return _this;
  }

  _createClass(EditModel, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {
      var dataValue = {};
      var dataTpl = [];
      var model = this.props.model;
      var modelId = this.props.dataSource.id;
      var updateList = this.props.updateList;
      var modelName = "";
      var modelNameArr = [];

      // let columns = [];

      // $.each(this.props.columns, function(index, val) {
      //   $.each(this.props.columns[index], function(k, v) {

      //     columns.push(GetColumnConfig(k, v, columns[index], this));

      //   });
      // });
      // console.log(this.props.columns);

      var projectUrl = this.props.url;

      _jquery2.default.each(this.props.columns, function (i, v) {
        if (_Config2.default.jsonRequestType() === "object") {
          modelName = v.key; // 字段名为 key
        } else {
          modelName = model + "[" + v.key + "]"; // 字段名修改为 model[key]
        }
        modelNameArr.push(modelName); // 字段名添加到数组

        dataValue[modelName] = "";
        if (v.initialValue) {
          dataValue[modelName] = v.initialValue;
        }
        dataValue[modelName] = (0, _GetColumnTpl2.default)(v.key, // 字段名称
        modelName, // 模型名称
        dataValue[modelName], // 默认值
        "edit", // 样式类型 [add, show, edit]
        projectUrl, // 项目地址
        modelId, // 数据id
        updateList, // 更新list
        undefined, // 分类解释数据字段名
        v.isLocal); // 是否是本地解释数据
        dataTpl.push(dataValue[modelName]);
      });

      this.setState({ model: dataTpl });
      this.setState({ modelName: modelNameArr });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {

      this.setState({ visible: nextProps.visible });

      // let thisClass = this;
      // let thisNextProps = nextProps;

      // setTimeout((thisClass, thisNextProps) => {

      var getFieldDecorator = nextProps.form.getFieldDecorator;


      var formItemLayout = {
        labelCol: { span: 3 },
        wrapperCol: { span: 18 }
      };

      var formItems = [];
      var formItemName = this.state.modelName;
      _jquery2.default.each(this.state.model, function (index, val) {
        if (nextProps.columns[index].editHidden !== true) {
          // 是否在编辑表单显示

          var rulesObj = {}; // 配置字段验证
          var initObj = {}; // 配置字段默认设置

          if (nextProps.columns[index].dataType !== undefined) {

            rulesObj = {
              type: nextProps.columns[index].dataType,
              required: nextProps.columns[index].required ? true : false,
              message: nextProps.columns[index].message ? nextProps.columns[index].message : ""
            };

            initObj.rules = [rulesObj];
          } else {

            rulesObj = {
              required: nextProps.columns[index].required ? true : false,
              message: nextProps.columns[index].message ? nextProps.columns[index].message : ""
            };

            initObj.rules = [rulesObj]; // 合并配置字段验证初始化设置
          }

          var columnsKey = nextProps.columns[index].key; // 获取字段key
          var columnsValue = ""; // 获取字段val
          if (nextProps.dataSource !== undefined && nextProps.dataSource !== null) {
            columnsValue = nextProps.dataSource[columnsKey];

            var regExp = /(_){1}[^_]+$/;
            var textIndex = columnsKey.search(regExp);
            switch (textIndex > -1 ? columnsKey.slice(textIndex) : 0) {
              case "_tag":
                // 标签类型字段需要重新用逗号分隔
                columnsValue = columnsValue + "";
                // console.log(columnsValue);
                break;
              case "_datetime":
                // 日期moment类型需要重新转换成日期字符串
                if (columnsValue === null) {
                  columnsValue = "";
                } else {
                  columnsValue = (0, _moment2.default)(columnsValue, 'YYYY-MM-DD HH:mm:ss');
                }
                break;
              case "_at":
                // 日期moment类型需要重新转换成日期字符串
                if (columnsValue === null) {
                  columnsValue = "";
                } else {
                  columnsValue = (0, _moment2.default)(columnsValue, 'YYYY-MM-DD HH:mm:ss');
                }
                break;
              case "_date":
                // 日期moment类型需要重新转换成日期字符串
                if (columnsValue === null) {
                  columnsValue = "";
                } else {
                  columnsValue = (0, _moment2.default)(columnsValue, 'YYYY-MM-DD');
                }
                break;
              default:
            }

            initObj.initialValue = columnsValue;
            // console.log(initObj);
          }

          if (nextProps.columns[index].valuePropName !== undefined) {
            initObj.valuePropName = nextProps.columns[index].valuePropName;
          }

          if (nextProps.columns[index].getValueFromEvent !== undefined) {
            initObj.getValueFromEvent = nextProps.normFile;
          }

          formItems.push(_react2.default.createElement(
            FormItem,
            _extends({}, formItemLayout, {
              label: nextProps.columns[index].title,
              key: index
            }),
            getFieldDecorator(formItemName[index], initObj)(val)
          ));
        }
      });
      // console.log(formItems);

      this.setState({ formItems: formItems });
      // }, 200);
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _antd.Modal,
        {
          className: 'editModel',
          key: this.state.newKey,
          visible: this.props.visible,
          title: this.props.title,
          width: 1200,
          style: { height: "90%", overflow: "hidden", top: "40px" },
          okText: '\u4FDD\u5B58',
          onCancel: this.props.onCancel,
          onOk: this.props.onCreate
        },
        _react2.default.createElement(
          _antd.Form,
          null,
          this.state.formItems
        )
      );
    }
  }]);

  return EditModel;
}(_react.Component);

EditModel = _antd.Form.create({})(EditModel);

exports.default = EditModel;
//# sourceMappingURL=EditModel.js.map