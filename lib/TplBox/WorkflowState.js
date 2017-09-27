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

var _GetFilterTpl = require('./GetFilterTpl');

var _GetFilterTpl2 = _interopRequireDefault(_GetFilterTpl);

var _WorkflowStateColumnTpl = require('./WorkflowStateColumnTpl');

var _WorkflowStateColumnTpl2 = _interopRequireDefault(_WorkflowStateColumnTpl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // 筛选模版


// 筛选模版

var WorkflowState = function (_Component) {
  _inherits(WorkflowState, _Component);

  function WorkflowState(props) {
    _classCallCheck(this, WorkflowState);

    // const value = props.value || "";
    var _this = _possibleConstructorReturn(this, (WorkflowState.__proto__ || Object.getPrototypeOf(WorkflowState)).call(this, props));

    _this.showModal = function () {
      _this.setState({
        visible: true
      });
    };

    _this.handleCancel = function () {
      return _this.setState({
        visible: false,
        newKey: _this.state.newKey === 1 ? 0 : 1
      });
    };

    _this.handleCreate = function (e) {

      // 状态按钮点击切换
      var stateObj = _this.props.stateObj; // 加载状态配置
      var dataId = _this.props.dataId; // 当前操作数据id
      var target = _this.state.target; // 目标点击DOM的自定义属性 data-action
      // var action = "";
      var result = "";
      var tips = "";
      // let actionValue = this.props.actionValue;
      var thisClass = _this;

      var config = _Global2.default.getHeader();

      // this.setState({ iconLoading: true });

      var params = {};

      params = thisClass.state.workflowTextObj;

      _Global2.default.LoadingStart();

      _axios2.default.put(_Global2.default.getUrl() + stateObj.url + "/" + dataId + "/" + target, params, config).then(function (response) {
        if (response.headers["access-token"]) {
          _Global2.default.setTokenHeader(response);
        }
        // console.log(response);
        if (response.status === 200) {
          // 当状态切换成功

          _jquery2.default.each(stateObj.state, function (k, v) {
            // console.log(k);
            if (thisClass.state.actionValue !== null) {
              // 如果actionValue 不为空

              if (k === thisClass.state.actionValue) {
                // 如果 配置字段===actionValue

                _jquery2.default.each(v.button, function (index, val) {
                  // 循环按钮

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
              // 如果value 不为空

              if (k === thisClass.state.value) {
                // 如果 配置字段===value

                _jquery2.default.each(v.button, function (index, val) {
                  // 循环按钮

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
            // 循环状态配置
            if (k === result) {
              // 如果配置字段===结果字段
              // console.log(v.text);

              var buttonTpl = [];
              _jquery2.default.each(v.button, function (index, val) {
                // 循环装填按钮

                buttonTpl.push(_react2.default.createElement(
                  'button',
                  { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, 'data-state': result, onClick: thisClass.enterIconLoading },
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
            _this.props.updateList(); // 更新列表
          }

          thisClass.setState({
            visible: false,
            workflowTextObj: {},
            newKey: _this.state.newKey === 1 ? 0 : 1
          });
        }
        _Global2.default.openNotification({ type: "success", title: "操作成功", body: tips });
        _Global2.default.LoadingEnd();
      }).catch(function (error) {
        thisClass.setState({
          visible: true
        });
        if (error.response.status === 422) {
          _Global2.default.openNotification({ type: "error", title: "操作失败", body: error.response.data.rs_msg });
        } else {
          _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
        }
        console.log(error);
        _Global2.default.getAuth(error);
        _Global2.default.LoadingEnd();
      });
    };

    _this.enterIconLoading = function (e) {
      // 状态按钮点击切换
      var stateObj = _this.props.stateObj; // 加载状态配置
      var dataId = _this.props.dataId; // 当前操作数据id
      var target = e.target.getAttribute("data-action"); // 目标点击DOM的自定义属性 data-action
      var targetState = e.target.getAttribute("data-state"); // 目标点击DOM的自定义属性 data-state
      // var action = "";
      var result = "";
      var tips = "";
      // let actionValue = this.props.actionValue;
      var thisClass = _this;

      var config = _Global2.default.getHeader();

      // this.setState({ iconLoading: true });

      var params = {};

      var isModal = false;
      var modalTpl = [];

      _jquery2.default.each(stateObj.state, function (key, val) {
        _jquery2.default.each(stateObj.state[key].button, function (i, v) {
          if (stateObj.state[key].button[i].action === target && key === targetState) {

            isModal = stateObj.state[key].button[i].isModal;

            if (isModal) {
              var modalCount = 0;
              _jquery2.default.each(stateObj.state[key].button[i].modalTpl, function (index, value) {
                modalTpl.push(_react2.default.createElement(_WorkflowStateColumnTpl2.default, { columnKey: stateObj.state[key].button[i].modalTpl[index].key,
                  type: stateObj.state[key].button[i].modalTpl[index].type,
                  key: key + "" + i + "" + index + "" + dataId,
                  value: stateObj.state[key].button[i].modalTpl[index].value,
                  title: stateObj.state[key].button[i].modalTpl[index].title,
                  placeHolder: stateObj.state[key].button[i].modalTpl[index].placeHolder,
                  onChange: thisClass.handleChange
                }));
              });
            }
          }
        });
      });

      if (isModal) {

        _this.setState({
          visible: true,
          modalTpl: modalTpl,
          target: target
        });
      } else {

        _Global2.default.LoadingStart();

        _axios2.default.put(_Global2.default.getUrl() + stateObj.url + "/" + dataId + "/" + target, params, config).then(function (response) {
          if (response.headers["access-token"]) {
            _Global2.default.setTokenHeader(response);
          }
          // console.log(response);
          if (response.status === 200) {
            // 当状态切换成功

            _jquery2.default.each(stateObj.state, function (k, v) {
              // console.log(k);
              if (thisClass.state.actionValue !== null) {
                // 如果actionValue 不为空

                if (k === thisClass.state.actionValue) {
                  // 如果 配置字段===actionValue

                  _jquery2.default.each(v.button, function (index, val) {
                    // 循环按钮

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
                // 如果value 不为空

                if (k === thisClass.state.value) {
                  // 如果 配置字段===value

                  _jquery2.default.each(v.button, function (index, val) {
                    // 循环按钮

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
              // 循环状态配置
              if (k === result) {
                // 如果配置字段===结果字段
                // console.log(v.text);

                var buttonTpl = [];
                _jquery2.default.each(v.button, function (index, val) {
                  // 循环装填按钮

                  buttonTpl.push(_react2.default.createElement(
                    'button',
                    { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, 'data-state': result, onClick: thisClass.enterIconLoading },
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
              _this.props.updateList(); // 更新列表
            }
          }
          _Global2.default.openNotification({ type: "success", title: "操作成功", body: tips });
          _Global2.default.LoadingEnd();
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
      }
    };

    _this.handleChange = function (e, dataString) {
      // workflow字段 onChange 事件
      var workflow_result = _this.state.workflowTextObj;

      // console.log(workflow_result);

      if (dataString !== undefined) {
        workflow_result[e.target.getAttribute("data-workflow")] = dataString;
      } else {
        workflow_result[e.target.getAttribute("data-workflow")] = e.target.value;
      }
      // console.log(e.target.getAttribute("data-workflow"));

      console.log(workflow_result);

      _this.setState({
        workflowTextObj: workflow_result
      });
    };

    _this.state = {
      // iconLoading: false,
      stateText: '',
      buttonTpl: [],
      actionValue: null,
      value: null,
      newKey: 1,
      visible: false, // 如果需要额外输入的按钮 点击会显示弹出层
      modalTpl: null, // 弹出模版
      modalData: null, // 弹出模版数据
      workflowTextObj: {}, // 弹出模版对象
      target: "" // 目标操作
    };

    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(WorkflowState, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var stateObj = this.props.stateObj; // 第一次加载获取状态配置
      // let dataId = this.props.dataId;
      // console.log(this.props.actionValue);
      // console.log(this.props.dataId);
      // console.log(this.props.value);

      var actionValue = "";
      if (this.props.actionValue || this.props.actionValue === 0) {
        // actionValue 是否有值 有值时 为list列表模式
        actionValue = this.props.actionValue + "";

        this.setState({
          actionValue: actionValue,
          value: null
        });
      } else if (this.props.value || this.props.value === 0) {
        // value 是否有值 有值时 为非list列表模式
        actionValue = this.props.value + "";

        this.setState({
          actionValue: null,
          value: actionValue
        });
      }

      var thisClass = this;

      // console.log(actionValue);
      _jquery2.default.each(stateObj.state, function (k, v) {
        // 循环状态配置
        if (k === actionValue) {
          // 如果 配置字段===actionValue
          // console.log(v.text);

          var buttonTpl = [];
          _jquery2.default.each(v.button, function (index, val) {
            // 装填当前配置下按钮列表

            buttonTpl.push(_react2.default.createElement(
              'button',
              { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, 'data-state': actionValue, onClick: thisClass.enterIconLoading },
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
      // console.log(nextProps); // 当值发生改变回收

      var stateObj = nextProps.stateObj;
      var actionValue = null;

      if (nextProps.actionValue || this.props.actionValue === 0) {
        // actionValue 是否有值 有值时 为list列表模式
        actionValue = nextProps.actionValue + "";

        this.setState({
          actionValue: actionValue,
          value: null
        });

        var thisClass = this;

        _jquery2.default.each(stateObj.state, function (k, v) {
          // 循环状态配置
          if (k === actionValue) {
            // 如果 配置字段===actionValue

            var buttonTpl = [];
            _jquery2.default.each(v.button, function (index, val) {
              // 装填当前配置下按钮列表

              buttonTpl.push(_react2.default.createElement(
                'button',
                { className: 'workflow-button', key: index, type: 'primary', 'data-action': val.action, 'data-state': actionValue, onClick: thisClass.enterIconLoading },
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
        this.state.buttonTpl,
        _react2.default.createElement(
          _antd.Modal,
          {
            key: this.state.newKey,
            title: this.state.title,
            width: 600,
            style: { overflow: "hidden", top: "40px" },
            okText: '\u786E\u5B9A',
            visible: this.state.visible,
            onCancel: this.handleCancel,
            onOk: this.handleCreate
          },
          this.state.modalTpl
        )
      );
    }
  }]);

  return WorkflowState;
}(_react.Component);

exports.default = WorkflowState;