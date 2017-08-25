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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import { Button } from 'antd';


var WorkflowState = function (_Component) {
  _inherits(WorkflowState, _Component);

  function WorkflowState(props) {
    _classCallCheck(this, WorkflowState);

    // const value = props.value || "";
    var _this = _possibleConstructorReturn(this, (WorkflowState.__proto__ || Object.getPrototypeOf(WorkflowState)).call(this, props));

    _this.enterIconLoading = function (e) {

      var stateObj = _this.props.stateObj;
      var dataId = _this.props.dataId;
      var target = e.target.getAttribute("data-action");
      // var action = "";
      var result = "";
      var tips = "";
      // let actionValue = this.props.actionValue;
      var thisClass = _this;

      var config = _Global2.default.getHeader();

      // this.setState({ iconLoading: true });

      var params = {};

      _Global2.default.LoadingStart();

      _axios2.default.put(_Global2.default.getUrl() + stateObj.url + "/" + dataId + "/" + target, params, config).then(function (response) {
        if (response.headers["access-token"]) {
          _Global2.default.setTokenHeader(response);
        }
        // console.log(response);
        if (response.status === 200) {

          _jquery2.default.each(stateObj.state, function (k, v) {
            // console.log(k);
            if (thisClass.state.actionValue !== null) {

              if (k === thisClass.state.actionValue) {

                _jquery2.default.each(v.button, function (index, val) {

                  if (v.button[index].action === target) {
                    // action = v.button[index].action;
                    result = v.button[index].result;
                    thisClass.setState({
                      actionValue: result,
                      value: null
                    });
                    tips = v.button[index].tips;
                  }
                });
              }
            } else {

              if (k === thisClass.state.value) {

                _jquery2.default.each(v.button, function (index, val) {

                  if (v.button[index].action === target) {
                    // action = v.button[index].action;
                    result = v.button[index].result;
                    thisClass.setState({
                      actionValue: null,
                      value: result
                    });
                    tips = v.button[index].tips;
                  }
                });
              }
            }
          });

          _jquery2.default.each(stateObj.state, function (k, v) {
            if (k === result) {
              // console.log(v.text);

              var buttonTpl = [];
              _jquery2.default.each(v.button, function (index, val) {

                buttonTpl.push(_react2.default.createElement(
                  'button',
                  { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, onClick: thisClass.enterIconLoading },
                  val.text
                ));
              });
              thisClass.setState({
                stateText: v.text,
                buttonTpl: buttonTpl
              });
            }
          });

          if (_this.props.updateList) {
            _this.props.updateList();
          }
        }
        _Global2.default.openNotification({ type: "success", title: "操作成功", body: tips });
        _Global2.default.LoadingEnd();
      }).catch(function (error) {
        _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
        console.log(error);
        _Global2.default.getAuth(error);
        _Global2.default.LoadingEnd();
      });
    };

    _this.state = {
      // iconLoading: false,
      stateText: '',
      buttonTpl: [],
      actionValue: null,
      value: null
    };
    return _this;
  }

  _createClass(WorkflowState, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var stateObj = this.props.stateObj;
      // let dataId = this.props.dataId;
      // console.log(this.props.actionValue);
      // console.log(this.props.dataId);
      // console.log(this.props.value);

      var actionValue = "";
      if (this.props.actionValue) {
        actionValue = this.props.actionValue;

        this.setState({
          actionValue: actionValue,
          value: null
        });
      } else if (this.props.value) {
        actionValue = this.props.value;

        this.setState({
          actionValue: null,
          value: this.props.value
        });
      }

      var thisClass = this;

      // console.log(actionValue);
      _jquery2.default.each(stateObj.state, function (k, v) {
        if (k === actionValue) {
          // console.log(v.text);

          var buttonTpl = [];
          _jquery2.default.each(v.button, function (index, val) {

            buttonTpl.push(_react2.default.createElement(
              'button',
              { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, onClick: thisClass.enterIconLoading },
              val.text
            ));
          });
          thisClass.setState({
            stateText: v.text,
            buttonTpl: buttonTpl
          });
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log(nextProps);

      var stateObj = nextProps.stateObj;
      var actionValue = "";

      if (nextProps.actionValue) {
        actionValue = nextProps.actionValue;

        this.setState({
          actionValue: nextProps.actionValue,
          value: null
        });

        var thisClass = this;

        _jquery2.default.each(stateObj.state, function (k, v) {
          if (k === actionValue) {

            var buttonTpl = [];
            _jquery2.default.each(v.button, function (index, val) {

              buttonTpl.push(_react2.default.createElement(
                'button',
                { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, onClick: thisClass.enterIconLoading },
                val.text
              ));
            });
            thisClass.setState({
              stateText: v.text,
              buttonTpl: buttonTpl
            });
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { style: { borderBottom: '1px #eee solid', padding: '0 0 5px 0', margin: '0 0 5px 0' } },
          this.state.stateText
        ),
        this.state.buttonTpl
      );
    }
  }]);

  return WorkflowState;
}(_react.Component);

exports.default = WorkflowState;
//# sourceMappingURL=WorkflowState.js.map