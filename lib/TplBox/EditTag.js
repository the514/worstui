'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditTag = function (_Component) {
  _inherits(EditTag, _Component);

  function EditTag(props) {
    _classCallCheck(this, EditTag);

    var _this = _possibleConstructorReturn(this, (EditTag.__proto__ || Object.getPrototypeOf(EditTag)).call(this, props));

    _this.handleClose = function (removedTag) {
      var tags = _this.state.tags.filter(function (tag) {
        return tag !== removedTag;
      });
      console.log(tags);

      _this.setState({ tags: tags });
      _this.triggerChange(tags);
    };

    _this.showInput = function () {
      _this.setState({ inputValue: "" });
      _this.setState({ inputVisible: true }, function () {
        return _this.input.focus();
      });
    };

    _this.handleInputChange = function (e) {
      _this.setState({ inputValue: e.target.value });
    };

    _this.handleInputConfirm = function () {
      var state = _this.state;
      var inputValue = state.inputValue;
      var tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [].concat(_toConsumableArray(tags), [inputValue]);
      }
      console.log(tags);

      _this.setState({ tags: tags });
      _this.triggerChange(tags);

      _this.setState({
        inputVisible: false,
        inputValue: ""
      });
    };

    _this.triggerChange = function (changedValue) {
      // Should provide an event to pass value to Form.
      var onChange = _this.props.onChange;
      if (onChange) {
        onChange(Object.assign(changedValue));
      }
    };

    _this.saveInputRef = function (input) {
      return _this.input = input;
    };

    var value = props.value || "";
    // console.log(value)
    _this.state = {
      value: value,
      tags: [],
      inputVisible: false,
      inputValue: "",
      key: 0
    };
    return _this;
  }

  _createClass(EditTag, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {

      if (this.state.value) {
        var valueText = this.state.value;
        var valueArr = [];

        if (!Array.isArray(valueText)) {
          valueArr = valueText.split(",");
          this.setState({ tags: valueArr });
        } else {
          if (valueText !== "") {
            this.setState({ tags: valueText });
          }
        }
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== "") {
        if ('value' in nextProps) {
          this.setState({ value: nextProps.value });
          var valueText = nextProps.value;
          var valueArr = [];

          if (!Array.isArray(valueText)) {
            valueArr = valueText.split(",");
            this.setState({ tags: valueArr });
          } else {
            this.setState({ tags: valueText });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          tags = _state.tags,
          inputVisible = _state.inputVisible,
          inputValue = _state.inputValue;

      return _react2.default.createElement(
        'div',
        null,
        tags.map(function (tag, index) {
          var isLongTag = tag.length > 20;
          var tagElem = _react2.default.createElement(
            _antd.Tag,
            { key: tag, closable: index > -1, afterClose: function afterClose() {
                return _this2.handleClose(tag);
              } },
            isLongTag ? tag.slice(0, 20) + '...' : tag
          );
          return isLongTag ? _react2.default.createElement(
            _antd.Tooltip,
            { title: tag },
            tagElem
          ) : tagElem;
        }),
        inputVisible && _react2.default.createElement(_antd.Input, {
          ref: this.saveInputRef,
          type: 'text',
          size: 'small',
          style: { width: 78 },
          value: inputValue,
          onChange: this.handleInputChange,
          onBlur: this.handleInputConfirm,
          onPressEnter: this.handleInputConfirm
        }),
        !inputVisible && _react2.default.createElement(
          _antd.Button,
          { size: 'small', type: 'dashed', onClick: this.showInput },
          '+ \u6DFB\u52A0'
        )
      );
    }
  }]);

  return EditTag;
}(_react.Component);

exports.default = EditTag;
//# sourceMappingURL=EditTag.js.map