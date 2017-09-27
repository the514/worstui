'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _antd = require('antd');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;

var SelectBox = function (_Component) {
  _inherits(SelectBox, _Component);

  function SelectBox(props) {
    _classCallCheck(this, SelectBox);

    var _this = _possibleConstructorReturn(this, (SelectBox.__proto__ || Object.getPrototypeOf(SelectBox)).call(this, props));

    _initialiseProps.call(_this);

    var value = props.value || "";
    _this.state = {
      data: [],
      value: value,
      options: [],
      selectLinkageValue: [], // 联查值
      selectLinkageOption: [], // 联查选项
      selectLinkageTpl: null // 联查模版
    };
    return _this;
  }

  _createClass(SelectBox, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {
      var _this2 = this;

      var config = _Global2.default.getHeader();
      _Global2.default.LoadingStart();

      var modeUrl = this.props.modelUrl; // 请求地址
      var modelDataKey = this.props.modelDataKey; // 数据key
      var modelDataValue = this.props.modelDataValue; // 数据value名
      var modelDataColumn = this.props.modelDataColumn; // edit模式下显示数据字段名
      var modelDataParams = this.props.modelDataParams; // edit模式下选中对应项

      // 判断是否是联查select
      if (this.props.modelDataLinkage && modeUrl.length > 0) {
        var selectTplData = []; // select所需数据
        // let selectTpl = []; // select样式
        var options = []; // option选项
        var value = []; // 联查值

        var thisClass = this;

        // 如果有值 通常在edit模式下
        if (this.props.value) {

          // console.log(this.props.value);

          _axios2.default.get(_Global2.default.getUrl() + modeUrl[modeUrl.length - 1] + "?q[id_eq]=" + this.props.value, config).then(function (response) {
            if (response.headers["access-token"]) {
              _Global2.default.setTokenHeader(response);
            }

            // console.log(response.data.list);

            selectTplData = response.data.list;
            if (selectTplData.length > 0) {

              _jquery2.default.each(modelDataColumn, function (index, val) {
                if (modelDataColumn.length - 1 === index) {
                  value.push(thisClass.state.value + "");
                } else {
                  value.push(selectTplData[0][modelDataColumn[index]] + "");
                }
              });
            }

            _jquery2.default.each(modeUrl, function (index, val) {

              options[index] = [];
              var params = "";
              // console.log(value[index]);
              if (modelDataParams[index] !== "") {
                if (index > 0) {
                  params = "?" + modelDataParams[index] + "=" + value[index - 1];
                } else {
                  params = "";
                }
              } else {
                params = "";
              }

              // console.log(index);
              // console.log(value[index]);
              // console.log(Global.getUrl() + modeUrl[index] + params);

              _axios2.default.get(_Global2.default.getUrl() + modeUrl[index] + params, config).then(function (response) {
                if (response.headers["access-token"]) {
                  _Global2.default.setTokenHeader(response);
                }

                // console.log(response.data.list);

                selectTplData = response.data.list;

                _jquery2.default.each(selectTplData, function (i, v) {
                  options[index].push(_react2.default.createElement(
                    Option,
                    { linkKey: index, key: selectTplData[i][modelDataValue[index]], value: selectTplData[i][modelDataValue[index]] + "" },
                    selectTplData[i][modelDataKey[index]]
                  ));
                });

                thisClass.setState({ selectLinkageOption: options });

                thisClass.updateOption();

                _Global2.default.LoadingEnd();
              }).catch(function (error) {
                _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
                console.log(error);
                _Global2.default.getAuth(error);
                _Global2.default.LoadingEnd();
              });
            });

            // console.log(value);

            thisClass.setState({
              selectLinkageValue: value
            });

            _Global2.default.LoadingEnd();
          }).catch(function (error) {
            _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
            console.log(error);
            _Global2.default.getAuth(error);
            _Global2.default.LoadingEnd();
          });

          // 如果无值 在add模式下或筛选模式
        } else {
          _jquery2.default.each(modeUrl, function (index, val) {

            options[index] = [];

            if (index > 0) {

              options[index] = [];
              if (thisClass.props.isFilter) {
                options[index].push(_react2.default.createElement(
                  Option,
                  { linkKey: index, key: -1, value: '' },
                  thisClass.props.filterText[index]
                ));
              }

              thisClass.setState({ selectLinkageOption: options });

              thisClass.updateOption();
            } else {

              _axios2.default.get(_Global2.default.getUrl() + modeUrl[index], config).then(function (response) {
                if (response.headers["access-token"]) {
                  _Global2.default.setTokenHeader(response);
                }

                // console.log(response.data.list);

                selectTplData = response.data.list;

                if (thisClass.props.isFilter) {
                  options[index].push(_react2.default.createElement(
                    Option,
                    { linkKey: index, key: -1, value: '' },
                    thisClass.props.filterText[index]
                  ));
                }

                _jquery2.default.each(selectTplData, function (i, v) {
                  options[index].push(_react2.default.createElement(
                    Option,
                    { linkKey: index, key: selectTplData[i][modelDataValue[index]], value: selectTplData[i][modelDataValue[index]] + "" },
                    selectTplData[i][modelDataKey[index]]
                  ));
                });

                thisClass.setState({ selectLinkageOption: options });

                thisClass.updateOption();

                _Global2.default.LoadingEnd();
              }).catch(function (error) {
                _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
                console.log(error);
                _Global2.default.getAuth(error);
                _Global2.default.LoadingEnd();
              });
            }
          });
        }

        // 如果不是联查select  
      } else {
        var _options = [];
        // let selectTpl = [];
        // 异步请求才会刷新state 非异步需要手动更新state
        // console.log(this.props.modelJson);

        // 本地数据select
        if (this.props.isLocal) {

          // console.log(this.props.modelJson.list);

          // console.log(response.data.list);
          // console.log(this.props.filterText);
          if (this.props.filterText) {
            _options.push(_react2.default.createElement(
              Option,
              { key: -1, value: '' },
              this.props.filterText
            ));
            this.props.modelJson.list.map(function (d) {
              return _options.push(_react2.default.createElement(
                Option,
                { key: d[_this2.props.modelDataValue], value: d[_this2.props.modelDataValue] + "" },
                d[_this2.props.modelDataKey]
              ));
            });
          } else {
            this.props.modelJson.list.map(function (d) {
              return _options.push(_react2.default.createElement(
                Option,
                { key: d[_this2.props.modelDataValue], value: d[_this2.props.modelDataValue] + "" },
                d[_this2.props.modelDataKey]
              ));
            });
          }

          // console.log(options);

          this.setState({
            data: this.props.modelJson.list,
            options: _options
          });

          this.updateOneOption(undefined, _options);

          _Global2.default.LoadingEnd();

          // 请求数据select
        } else {
          _axios2.default.get(_Global2.default.getUrl() + this.props.modelUrl, config).then(function (response) {
            if (response.headers["access-token"]) {
              _Global2.default.setTokenHeader(response);
            }
            // console.log(response.data.list);
            _this2.setState({ data: response.data.list });
            // console.log(response.data.list);
            if (_this2.props.filterText) {
              _options.push(_react2.default.createElement(
                Option,
                { key: -1, value: '' },
                _this2.props.filterText
              ));
              _this2.state.data.map(function (d) {
                return _options.push(_react2.default.createElement(
                  Option,
                  { key: d[_this2.props.modelDataValue], value: d[_this2.props.modelDataValue] + "" },
                  d[_this2.props.modelDataKey]
                ));
              });
            } else {
              _this2.state.data.map(function (d) {
                return _options.push(_react2.default.createElement(
                  Option,
                  { key: d[_this2.props.modelDataValue], value: d[_this2.props.modelDataValue] + "" },
                  d[_this2.props.modelDataKey]
                ));
              });
            }

            // console.log(this.props.value);
            // console.log(this.state.value);

            _this2.setState({ options: _options });

            _this2.updateOneOption();

            _Global2.default.LoadingEnd();
          }).catch(function (error) {
            _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
            console.log(error);
            _Global2.default.getAuth(error);
            _Global2.default.LoadingEnd();
          });
        }
      }

      // console.log(this.props.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var selectTpl = null;

      selectTpl = this.state.selectLinkageTpl;

      return _react2.default.createElement(
        'div',
        null,
        selectTpl
      );
    }
  }]);

  return SelectBox;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.triggerChange = function (changedValue) {
    // Should provide an event to pass value to Form.
    var onChange = _this3.props.onChange;
    if (onChange) {
      onChange(Object.assign(changedValue));
    }
  };

  this.handleChange = function (value) {
    console.log(value);
    _this3.setState({ value: value });
    _this3.triggerChange(value);

    _this3.updateOneOption(value);
  };

  this.updateOption = function (value, options) {
    var thisClass = _this3;
    var selectTpl = [];

    _jquery2.default.each(_this3.state.selectLinkageOption, function (index, val) {

      // 有值
      if (value !== undefined) {
        selectTpl.push(_react2.default.createElement(
          _antd.Select,
          {
            key: index,
            value: value + "",
            onSelect: thisClass.handleLinkageSelect,
            placeholder: thisClass.props.placeholder[index],
            style: { width: this.props.width ? this.props.width : "auto" }
          },
          thisClass.state.selectLinkageOption[index]
        ));
        // 无值
      } else {
        // 如果是筛选模式
        if (thisClass.props.isFilter) {
          selectTpl.push(_react2.default.createElement(
            _antd.Select,
            _defineProperty({
              style: { marginRight: index === thisClass.state.selectLinkageOption.length - 1 ? 0 : 5 },
              key: index,
              value: thisClass.state.selectLinkageValue[index] ? thisClass.state.selectLinkageValue[index] : "",
              onSelect: thisClass.handleLinkageSelect,
              placeholder: thisClass.props.placeholder[index]
            }, 'style', { width: thisClass.props.width ? thisClass.props.width : "auto" }),
            thisClass.state.selectLinkageOption[index]
          ));
          // 如果是workflow模式
        } else if (thisClass.props.isWorkflow) {
          selectTpl.push(_react2.default.createElement(
            _antd.Select,
            {
              key: index,
              value: undefined,
              onSelect: thisClass.handleLinkageSelect,
              placeholder: thisClass.props.placeholder,
              style: { width: thisClass.props.width ? thisClass.props.width : "auto" }
            },
            options ? options : thisClass.state.options
          ));
          // 不是筛选模式
        } else {
          // console.log(this.state.options);
          selectTpl.push(_react2.default.createElement(
            _antd.Select,
            {
              key: index,
              value: thisClass.state.selectLinkageValue[index],
              onSelect: thisClass.handleLinkageSelect,
              placeholder: thisClass.props.placeholder[index],
              style: { width: thisClass.props.width ? thisClass.props.width : "auto" }
            },
            thisClass.state.selectLinkageOption[index]
          ));
        }
      }
    });

    // console.log(selectTpl);

    _this3.setState({ selectLinkageTpl: selectTpl });
  };

  this.updateOneOption = function (value, options) {
    var selectTpl = [];
    // console.log(value);
    // console.log(this.props.value);

    // 有值
    if (value !== undefined) {
      selectTpl.push(_react2.default.createElement(
        _antd.Select,
        {
          key: 1,
          value: value + "",
          onChange: _this3.handleChange,
          placeholder: _this3.props.placeholder,
          style: { width: _this3.props.width ? _this3.props.width : "auto" }
        },
        _this3.state.options
      ));
      // 无值
    } else {
      // 如果是筛选模式
      if (_this3.props.isFilter) {
        selectTpl.push(_react2.default.createElement(
          _antd.Select,
          {
            key: 1,
            value: "",
            onChange: _this3.handleChange,
            placeholder: _this3.props.placeholder,
            style: { width: _this3.props.width ? _this3.props.width : "auto" }
          },
          options ? options : _this3.state.options
        ));
        // 如果是workflow模式
      } else if (_this3.props.isWorkflow) {
        selectTpl.push(_react2.default.createElement(
          _antd.Select,
          {
            key: 1,
            value: undefined,
            onChange: _this3.handleChange,
            placeholder: _this3.props.placeholder,
            style: { width: _this3.props.width ? _this3.props.width : "auto" }
          },
          options ? options : _this3.state.options
        ));
        // 不是筛选模式
      } else {
        // console.log(this.state.options);
        selectTpl.push(_react2.default.createElement(
          _antd.Select,
          {
            key: 1,
            value: _this3.props.value ? _this3.state.value + "" : undefined,
            onChange: _this3.handleChange,
            placeholder: _this3.props.placeholder,
            style: { width: _this3.props.width ? _this3.props.width : "auto" }
          },
          options ? options : _this3.state.options
        ));
      }
    }

    _this3.setState({ selectLinkageTpl: selectTpl });
  };

  this.handleLinkageChange = function (e) {
    console.log(e);
  };

  this.handleLinkageSelect = function (v, o) {
    var config = _Global2.default.getHeader();
    _Global2.default.LoadingStart();

    var thisClass = _this3;
    var modelUrl = _this3.props.modelUrl; // 请求地址
    var modelDataKey = _this3.props.modelDataKey; // 数据key
    var modelDataValue = _this3.props.modelDataValue; // 数据value名
    var modelUrlLength = _this3.props.modelUrl.length; // select联动长度
    var modelDataParams = _this3.props.modelDataParams; // edit模式下选中对应项
    var selectTplData = [];

    var options = _this3.state.selectLinkageOption;

    if (o.props.linkKey + 1 < modelUrlLength) {
      // 如果当前select的linkKey + 1 小于 配置联查接口长度

      var value = _this3.state.selectLinkageValue;
      if (o.props.linkKey === 0) {
        // 如果当前select的linkKey === 0
        value = [];
      }
      value[o.props.linkKey] = o.props.value; // 设置第1个select的值为 props.value
      value[o.props.linkKey + 1] = undefined; // 设置下一个select的值为 undefined
      if (thisClass.props.isFilter) {
        value[o.props.linkKey + 1] = ""; // 设置下一个select的值为 ""
      }
      // value[1] = o.props.value;
      _this3.setState({ selectLinkageValue: value });

      var params = "";
      if (modelDataParams[o.props.linkKey + 1] !== "") {
        // 判断下一个select的配置项不为空
        params = "?" + modelDataParams[o.props.linkKey + 1] + "=" + o.props.value; // 进行联查
      } else {
        params = ""; // 什么也不做
      }

      _axios2.default.get(_Global2.default.getUrl() + modelUrl[o.props.linkKey + 1] + params, config) // 进行联查请求
      .then(function (response) {
        if (response.headers["access-token"]) {
          _Global2.default.setTokenHeader(response);
        }
        // console.log(response.data.list);

        selectTplData = response.data.list;

        options[o.props.linkKey + 1] = []; // 初始化下一个select为空值

        if (thisClass.props.isFilter) {
          options[o.props.linkKey + 1].push(_react2.default.createElement(
            Option,
            { linkKey: o.props.linkKey + 1, key: -1, value: "" },
            thisClass.props.filterText[o.props.linkKey + 1]
          ));
        }

        _jquery2.default.each(selectTplData, function (i, v) {
          options[o.props.linkKey + 1].push(_react2.default.createElement(
            Option,
            { linkKey: o.props.linkKey + 1, key: selectTplData[i][modelDataValue[o.props.linkKey + 1]], value: selectTplData[i][modelDataValue[o.props.linkKey + 1]] + "" },
            selectTplData[i][modelDataKey[o.props.linkKey + 1]]
          ));
        });

        // 为下一个select装填option项

        // 如果后面有两个select存在 同样设置为空值
        if (o.props.linkKey + 2 <= modelUrlLength - 1) {
          options[o.props.linkKey + 2] = [];
          if (thisClass.props.isFilter) {
            options[o.props.linkKey + 2].push(_react2.default.createElement(
              Option,
              { linkKey: o.props.linkKey + 2, key: -1, value: "" },
              thisClass.props.filterText[o.props.linkKey + 2]
            ));
          }
        }

        // console.log(options);

        _this3.setState({
          selectLinkageOption: options
        });

        if (_this3.props.isFilter) {
          _this3.triggerChange(value.join(","));
        }

        _this3.updateOption();

        _Global2.default.LoadingEnd();
      }).catch(function (error) {
        _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
        console.log(error);
        _Global2.default.getAuth(error);
        _Global2.default.LoadingEnd();
      });
    } else if (o.props.linkKey + 1 === modelUrlLength) {
      // 如果 下一个select 大于配置项的长度

      var _value = _this3.state.selectLinkageValue;
      _value[o.props.linkKey] = o.props.value; // 只改变当前值
      // value[o.props.linkKey + 1] = undefined;
      // value[1] = o.props.value;
      _this3.setState({ selectLinkageValue: _value });
      _this3.setState({ value: o.props.value });
      if (_this3.props.isFilter) {
        _this3.triggerChange(_value.join(","));
      } else {
        _this3.triggerChange(o.props.value);
      }

      _this3.setState({
        selectLinkageOption: options
      });

      _this3.updateOption();
      _Global2.default.LoadingEnd();
    }

    // console.log(this.state.selectLinkageOption);
  };
};

exports.default = SelectBox;