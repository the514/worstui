'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import Config from '../../../../src/Modules/Config';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _Config = require('../Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

var _GetColumnTpl = require('./GetColumnTpl');

var _GetColumnTpl2 = _interopRequireDefault(_GetColumnTpl);

var _antd = require('antd');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;

var CollectionCreateForm = _antd.Form.create({
  // onValuesChange: (props, values) => {
  //   console.log(props);
  //   console.log(values);
  //   $.each(values, function(k, v) {
  //     $.each(values[k], function(key, val) {
  //       console.log(key);
  //       Global.linkageChangeData(key);
  //     });
  //   });
  // }
})(function (props) {
  var visible = props.visible,
      onCancel = props.onCancel,
      onCreate = props.onCreate,
      form = props.form;
  var getFieldDecorator = form.getFieldDecorator;


  var formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 18 }
  };

  var formItems = [];
  _jquery2.default.each(props.formItemList, function (index, val) {
    if (props.columns[index].addHidden !== true) {
      // 是否在添加表单显示

      var rulesObj = {}; // 配置字段验证
      var initObj = {}; // 配置字段默认设置

      if (props.columns[index].dataType !== undefined) {

        rulesObj = {
          type: props.columns[index].dataType,
          required: props.columns[index].required ? true : false,
          message: props.columns[index].message ? props.columns[index].message : ""
        };

        initObj.rules = [rulesObj];
      } else {

        rulesObj = {
          required: props.columns[index].required ? true : false,
          message: props.columns[index].message ? props.columns[index].message : ""
        };

        initObj.rules = [rulesObj]; // 合并配置字段验证初始化设置
      }

      if (props.columns[index].initialValue !== undefined) {
        initObj.initialValue = props.columns[index].initialValue;
      } else {
        initObj.initialValue = null;
      }

      if (props.columns[index].valuePropName !== undefined) {
        initObj.valuePropName = props.columns[index].valuePropName;
      }

      if (props.columns[index].getValueFromEvent !== undefined) {
        initObj.getValueFromEvent = props.normFile;
      }

      formItems.push(_react2.default.createElement(
        FormItem,
        _extends({}, formItemLayout, {
          label: props.columns[index].title,
          key: index
        }),
        getFieldDecorator(props.formItemName[index], initObj)(val)
      ));
    }
  });

  return _react2.default.createElement(
    _antd.Modal,
    {
      key: props.newKey,
      visible: visible,
      title: props.title,
      width: props.width,
      style: { height: "90%", overflow: "hidden", top: "40px" },
      okText: '\u6DFB\u52A0',
      onCancel: onCancel,
      onOk: onCreate
    },
    _react2.default.createElement(
      _antd.Form,
      null,
      formItems
    )
  );
});

// 添加新数据模态框

var AddModel = function (_Component) {
  _inherits(AddModel, _Component);

  function AddModel() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AddModel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddModel.__proto__ || Object.getPrototypeOf(AddModel)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: false,
      model: [],
      modelName: [],
      newKey: 1,
      showAddButton: true
    }, _this.showModal = function () {
      _this.setState({
        visible: true
      });
    }, _this.handleCancel = function () {
      return _this.setState({
        visible: false,
        newKey: _this.state.newKey === 1 ? 0 : 1
      });
    }, _this.handleCreate = function (e) {
      var form = _this.form;
      var isFileMode = false;

      form.validateFields(function (err, fieldsValue) {
        if (err) {
          console.log(fieldsValue);
          return;
        }

        if (_Config2.default.jsonRequestType() === "object") {
          _jquery2.default.each(fieldsValue, function (k, v) {

            var regExp = /(_){1}[^_]+$/;
            var textIndex = k.search(regExp);
            switch (textIndex > -1 ? k.slice(textIndex) : 0) {
              case "_tag":
                _jquery2.default.each(fieldsValue[k], function (tagIndex, tagVal) {
                  tagIndex === 0 ? fieldsValue[k] = tagVal : fieldsValue[k] += "," + tagVal;
                });
                break;
              case "_datetime":
                fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
                break;
              case "_at":
                fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
                break;
              case "_date":
                fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD');
                break;
              case "_manage":
                // 如果存在需要同步上传图片的字段
                isFileMode = true;
                break;
              default:
            }
          });
        } else {
          _jquery2.default.each(fieldsValue, function (index, val) {
            _jquery2.default.each(fieldsValue[index], function (k, v) {

              var regExp = /(_){1}[^_]+$/;
              var textIndex = k.search(regExp);
              switch (textIndex > -1 ? k.slice(textIndex) : 0) {
                case "_tag":
                  _jquery2.default.each(fieldsValue[index][k], function (tagIndex, tagVal) {
                    tagIndex === 0 ? fieldsValue[index][k] = tagVal : fieldsValue[index][k] += "," + tagVal;
                  });
                  break;
                case "_datetime":
                  if (fieldsValue[index][k] === null) {
                    fieldsValue[index][k] = "";
                  } else {
                    fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  }
                  break;
                case "_at":
                  if (fieldsValue[index][k] === null) {
                    fieldsValue[index][k] = "";
                  } else {
                    fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  }
                  break;
                case "_date":
                  if (fieldsValue[index][k] === null) {
                    fieldsValue[index][k] = "";
                  } else {
                    fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD');
                  }
                  break;
                case "_manage":
                  // 如果存在需要同步上传图片的字段
                  isFileMode = true;
                  break;
                default:
              }
            });
          });
        }

        console.log('Received values of form: ', fieldsValue);

        _Global2.default.LoadingStart();

        var config = _Global2.default.getHeader();

        var params = fieldsValue;

        if (isFileMode) {
          config.headers["Content-type"] = 'multipart/form-data';

          params = new FormData();
          if (_Config2.default.jsonRequestType() === "object") {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = fieldsValue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                params.append(key, fieldsValue[key]);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          } else {
            _jquery2.default.each(fieldsValue, function (key, val) {
              _jquery2.default.each(fieldsValue[key], function (k, v) {
                params.append(key + "[" + k + "]", fieldsValue[key][k]);
              });
            });
          }
        }

        _axios2.default.post(_this.props.url + _this.props.modelUrl, params, config).then(function (response) {
          if (response.headers["access-token"]) {
            _Global2.default.setTokenHeader(response);
          }
          console.log(response.headers);

          _Global2.default.openNotification({ type: "success", title: "操作成功", body: _this.props.addTips });
          _this.props.updateList();
          _Global2.default.LoadingEnd();

          form.resetFields();
          _this.setState({
            visible: false,
            newKey: _this.state.newKey + 1
          });
        }).catch(function (error) {
          if (error.response.status === 422) {
            _Global2.default.openNotification({ type: "error", title: "操作失败", body: error.response.data.rs_msg });
          } else {
            _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
          }
          console.log(error);
          _Global2.default.getAuth(error);
          _Global2.default.LoadingEnd();
        });
      });
    }, _this.saveFormRef = function (form) {
      _this.form = form;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AddModel, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {
      var dataValue = {};
      var dataTpl = [];
      var model = this.props.model;
      var modelName = "";
      var modelNameArr = [];

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
          dataValue[modelName] = v.initialValue; // 设置字段默认值
        }
        dataValue[modelName] = (0, _GetColumnTpl2.default)(v.key, // 字段名称
        modelName, // 模型名称
        dataValue[modelName], // 默认值
        "add", // 样式类型 [add, show, edit]
        projectUrl, // 项目地址
        "", // 数据id
        undefined, // updateList 回调函数
        undefined, // 分类解释数据字段名
        v.isLocal // 是否是本地解释数据
        );
        dataTpl.push(dataValue[modelName]);
      });

      this.setState({
        model: dataTpl,
        modelName: modelNameArr,
        showAddButton: this.props.isHiddenAddButton ? false : true
      });
      // this.setState({modelName: modelNameArr});
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.showAddButton && _react2.default.createElement(
          _antd.Button,
          { className: 'add-button-top', type: 'primary', icon: 'plus', onClick: this.showModal },
          '\u6DFB\u52A0'
        ),
        _react2.default.createElement(CollectionCreateForm, {
          newKey: this.state.newKey,
          ref: this.saveFormRef,
          width: 1200,
          title: this.props.title,
          columns: this.props.columns,
          visible: this.state.visible,
          onCancel: this.handleCancel,
          onCreate: this.handleCreate,
          formItemList: this.state.model,
          formItemName: this.state.modelName
        })
      );
    }
  }]);

  return AddModel;
}(_react.Component);

exports.default = AddModel;