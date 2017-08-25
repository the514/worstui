'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confirm = _antd.Modal.confirm;

// 字段样式
var GetColumnConfig = function GetColumnConfig(k, v, object, thisClass) {
  // k:字段名, object 当前字段配置对象, thisClass List对象

  var regExp = /(_){1}[^_]+$/;
  var textIndex = k.search(regExp);
  var thisObject = object;

  if (thisObject.message) {
    thisObject.required = true;
  }

  switch (textIndex > -1 ? k.slice(textIndex) : k) {

    case "_img":
      thisObject.valuePropName = 'fileList';
      thisObject.getValueFromEvent = true;
      break;
    case "_imgarr":
      thisObject.valuePropName = 'fileList';
      thisObject.getValueFromEvent = true;
      break;
    case "_checkbox":
      thisObject.valuePropName = "checked";
      thisObject.initialValue = false;
      break;
    case "_boolean":
      thisObject.valuePropName = "checked";
      thisObject.initialValue = false;
      break;
    case "_action":
      thisObject.render = function (text, record) {
        return _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement(
            'a',
            { 'data-button': 'show' },
            _react2.default.createElement(_antd.Icon, { type: 'search', 'data-button': 'show', style: { paddingRight: "5px" } }),
            '\u67E5\u770B'
          ),
          _react2.default.createElement('span', { className: 'ant-divider' }),
          _react2.default.createElement(
            'a',
            { 'data-button': 'edit' },
            _react2.default.createElement(_antd.Icon, { type: 'edit', 'data-button': 'edit', style: { paddingRight: "5px" } }),
            '\u7F16\u8F91'
          ),
          _react2.default.createElement('span', { className: 'ant-divider' }),
          _react2.default.createElement(
            'a',
            { 'data-button': 'delete' },
            _react2.default.createElement(_antd.Icon, { type: 'delete', 'data-button': 'delete', style: { paddingRight: "5px" } }),
            '\u5220\u9664'
          )
        );
      };
      thisObject.onCellClick = function (record, event) {
        // console.log(record);
        // console.log(event);
        var config = _Global2.default.getHeader();

        if (event.target.getAttribute("data-button") === "show") {

          _Global2.default.LoadingStart();

          _axios2.default.get(_Global2.default.getUrl() + thisClass.props.modelUrl + "/" + record.id, config).then(function (response) {

            if (response.headers["access-token"]) {
              _Global2.default.setTokenHeader(response);
            }
            // console.log(response.headers);
            // console.log(response);
            thisClass.setState({ showData: response.data });
            _Global2.default.LoadingEnd();

            thisClass.setState({ showVisible: true });
            thisClass.setState({ editVisible: false });

            setTimeout(function () {
              (0, _jquery2.default)(".showModel .ant-modal-content").scrollTop(0);
            }, 200);

            thisClass.setState({ dataId: response.data.id });
          }).catch(function (error) {
            _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
            console.log(error);
            _Global2.default.getAuth(error);
            _Global2.default.LoadingEnd();
          });
        } else if (event.target.getAttribute("data-button") === "edit") {

          _Global2.default.LoadingStart();

          _axios2.default.get(_Global2.default.getUrl() + thisClass.props.modelUrl + "/" + record.id, config).then(function (response) {
            if (response.headers["access-token"]) {
              _Global2.default.setTokenHeader(response);
            }
            // console.log(response);
            thisClass.setState({ editData: response.data });
            // console.log( response.data.id );

            _Global2.default.LoadingEnd();

            thisClass.setState({ showVisible: false });
            thisClass.setState({ editVisible: true });

            setTimeout(function () {
              (0, _jquery2.default)(".editModel .ant-modal-content").scrollTop(0);
            }, 200);

            // console.log(response.data);
            // console.log(response.data.id);

            thisClass.setState({ dataId: response.data.id });
          }).catch(function (error) {
            _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
            console.log(error);
            _Global2.default.getAuth(error);
            _Global2.default.LoadingEnd();
          });
        } else if (event.target.getAttribute("data-button") === "delete") {

          confirm({
            title: '确定删除?',
            // content: 'Some descriptions',
            onOk: function onOk() {
              // console.log('OK');
              _Global2.default.LoadingStart();

              _axios2.default.delete(_Global2.default.getUrl() + thisClass.props.modelUrl + "/" + record.id, config).then(function (response) {
                if (response.headers["access-token"]) {
                  _Global2.default.setTokenHeader(response);
                }
                // console.log(response.headers);
                thisClass.updateList();
                _Global2.default.openNotification({ type: "success", title: "操作成功", body: thisClass.props.deleteTips });
                _Global2.default.LoadingEnd();
              }).catch(function (error) {
                _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
                console.log(error);
                _Global2.default.getAuth(error);
                _Global2.default.LoadingEnd();
              });
            },
            onCancel: function onCancel() {
              // console.log('Cancel');
            }
          });
        }
      };

      break;
    default:

  }
  // console.log(thisObject);
  return thisObject;
};

exports.default = GetColumnConfig;
//# sourceMappingURL=GetColumnConfig.js.map