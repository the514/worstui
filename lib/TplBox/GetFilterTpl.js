'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _SelectBox = require('./SelectBox');

var _SelectBox2 = _interopRequireDefault(_SelectBox);

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import FilterInput from './FilterInput';

// import Config from '../Modules/Config';


// const Option = Select.Option;
// const RadioGroup = Radio.Group;
// const CheckboxGroup = Checkbox.Group;

var GetFilterTpl = function (_Component) {
  _inherits(GetFilterTpl, _Component);

  function GetFilterTpl(props) {
    _classCallCheck(this, GetFilterTpl);

    var _this = _possibleConstructorReturn(this, (GetFilterTpl.__proto__ || Object.getPrototypeOf(GetFilterTpl)).call(this, props));

    _this.filterHandleChange = function (e, dataString) {

      _this.setState({
        dateValue: dataString
      });

      var event = new Event('input', { bubbles: true });
      _this.dateinput.dispatchEvent(event);

      _this.filterInputHandleChange(event, dataString);
    };

    _this.filterInputHandleChange = function (e, dataString) {
      console.log(e.target.value);
      _this.props.onChange(e, dataString);
    };

    _this.filterHandleSelectChange = function (dataString) {
      console.log(_this.state.filterLinkageDataKey);
      var obj = {};
      _jquery2.default.each(_this.state.filterLinkageDataKey, function (index, val) {
        obj[val] = dataString.split(",")[index];
      });

      _this.setState({
        dateValue: obj
      });

      var event = new Event('input', { bubbles: true });
      _this.dateinput.dispatchEvent(event);

      _this.filterInputHandleChange(event, obj);
    };

    _this.filterInputHandleSelectChange = function (e, dataString) {
      console.log(e.target.value);
      _this.props.onChange(e, dataString);
    };

    _this.state = {
      dataValue: null,
      filterLinkageDataKey: "", // 筛选模式下的联查字段值
      dateValue: "" // 日期值
    };

    _this.filterHandleChange = _this.filterHandleChange.bind(_this);
    _this.filterInputHandleChange = _this.filterInputHandleChange.bind(_this);
    return _this;
  }

  _createClass(GetFilterTpl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // key:筛选参数名 type:筛选类型 k: react unique key pHolder: placeholder文字 onChange: 修改事件 val: 筛选值
      var key = this.props.filterKey;
      var type = this.props.type;
      // let k = this.props.key;
      var pHolder = this.props.pHolder;
      var onChange = this.props.onChange;
      var val = this.props.val;
      var isLocal = this.props.isLocal;

      var dataValue = null;

      switch (type) {

        case "text":
          // console.log(val);

          dataValue = _react2.default.createElement(
            'div',
            { className: 'filter-item filter-item-text' },
            _react2.default.createElement(_antd.Input, { placeholder: pHolder, 'data-filter': key, onChange: onChange, defaultValue: val[key] })
          );

          break;
        case "date":
          // console.log(val);

          dataValue = _react2.default.createElement(
            'div',
            { className: 'filter-item filter-item-date' },
            _react2.default.createElement(_antd.DatePicker, {
              'data-filter': key,
              onChange: this.filterHandleChange,
              placeholder: pHolder
            }),
            _react2.default.createElement('input', {
              type: 'hidden',
              ref: function ref(input) {
                return _this2.dateinput = input;
              },
              'data-filter': key,
              value: this.state.dateValue,
              onChange: this.filterInputHandleChange
            })
          );

          break;
        case "datetime":

          dataValue = _react2.default.createElement(
            'div',
            { className: 'filter-item filter-item-datetime' },
            _react2.default.createElement(_antd.DatePicker, {
              showTime: true,
              format: 'YYYY-MM-DD HH:mm:ss',
              placeholder: pHolder,
              onChange: this.filterHandleChange
            }),
            _react2.default.createElement('input', {
              type: 'hidden',
              ref: function ref(input) {
                return _this2.dateinput = input;
              },
              'data-filter': key,
              value: this.state.dateValue,
              onChange: this.filterInputHandleChange
            })
          );

          break;
        case "select":

          var SelectTpl = _Global2.default.columnsDataSource(key);
          this.setState({ filterLinkageDataKey: SelectTpl.modelDataFilterKey });

          if (isLocal) {
            dataValue = _react2.default.createElement(
              'div',
              { className: 'filter-item filter-item-select' },
              _react2.default.createElement(_SelectBox2.default, {
                modelJson: SelectTpl.modelJson,
                modelDataKey: SelectTpl.modelDataKey,
                modelDataValue: SelectTpl.modelDataValue,
                placeholder: SelectTpl.modelDataPlaceholder,
                filterText: SelectTpl.modelDataFilterText,
                isFilter: true,
                isLocal: isLocal,
                onChange: this.filterHandleSelectChange,
                modelDataLinkage: SelectTpl.modelDataLinkage,
                modelDataColumn: SelectTpl.modelDataColumn,
                modelDataParams: SelectTpl.modelDataParams
              }),
              _react2.default.createElement('input', {
                type: 'hidden',
                ref: function ref(input) {
                  return _this2.dateinput = input;
                },
                'data-filter': key,
                value: this.state.dateValue,
                onChange: this.filterInputHandleSelectChange
              })
            );
          } else {

            dataValue = _react2.default.createElement(
              'div',
              { className: 'filter-item filter-item-select' },
              _react2.default.createElement(_SelectBox2.default, {
                modelUrl: SelectTpl.modelUrl,
                modelDataKey: SelectTpl.modelDataKey,
                modelDataValue: SelectTpl.modelDataValue,
                placeholder: SelectTpl.modelDataPlaceholder,
                filterText: SelectTpl.modelDataFilterText,
                isFilter: true,
                onChange: this.filterHandleSelectChange,
                modelDataLinkage: SelectTpl.modelDataLinkage,
                modelDataColumn: SelectTpl.modelDataColumn,
                modelDataParams: SelectTpl.modelDataParams
              }),
              _react2.default.createElement('input', {
                type: 'hidden',
                ref: function ref(input) {
                  return _this2.dateinput = input;
                },
                'data-filter': key,
                value: this.state.dateValue,
                onChange: this.filterInputHandleSelectChange
              })
            );
          }

          break;
        default:
          dataValue = dataValue + "";

      }

      this.setState({
        dataValue: dataValue
      });
    }

    // datepicker on change function


    // select on change function

  }, {
    key: 'render',
    value: function render() {
      return this.state.dataValue;
    }
  }]);

  return GetFilterTpl;
}(_react.Component);

exports.default = GetFilterTpl;