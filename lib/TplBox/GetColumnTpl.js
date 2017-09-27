'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImgModal = require('./ImgModal');

var _ImgModal2 = _interopRequireDefault(_ImgModal);

var _EditTag = require('./EditTag');

var _EditTag2 = _interopRequireDefault(_EditTag);

var _FormatDate = require('./FormatDate');

var _FormatDate2 = _interopRequireDefault(_FormatDate);

var _ImgUpload = require('./ImgUpload');

var _ImgUpload2 = _interopRequireDefault(_ImgUpload);

var _SelectBox = require('./SelectBox');

var _SelectBox2 = _interopRequireDefault(_SelectBox);

var _CkBox = require('./CkBox');

var _CkBox2 = _interopRequireDefault(_CkBox);

var _CkeditorImg = require('./CkeditorImg');

var _CkeditorImg2 = _interopRequireDefault(_CkeditorImg);

var _WorkflowState = require('./WorkflowState');

var _WorkflowState2 = _interopRequireDefault(_WorkflowState);

var _ImgSynchroUpload = require('./ImgSynchroUpload');

var _ImgSynchroUpload2 = _interopRequireDefault(_ImgSynchroUpload);

var _antd = require('antd');

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Option = Select.Option;
var RadioGroup = _antd.Radio.Group;
// import Config from '../Modules/Config';
var TextArea = _antd.Input.TextArea;
// const CheckboxGroup = Checkbox.Group;

// 字段样式

var GetColumnTpl = function GetColumnTpl(k, v, dataValue, type, url, dataId, updateList, otherVal, isLocal) {
  // k:字段名 v:字段值 dataValue:字段值 type:字段类型 url:项目地址 
  // dataId: data id updateList:更新list回调 otherVal: 分类解释数据字段名 isLocal: selectbox 是否是本地解释数据

  var regExp = /(_){1}[^_]+$/;
  var textIndex = k.search(regExp);

  switch (textIndex > -1 ? k.slice(textIndex) : k) {

    case "_tag":
      if (type === "add") {
        dataValue = _react2.default.createElement(_EditTag2.default, null);
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_EditTag2.default, null);
      } else {
        dataValue = [];
        if (v.length > 0) {
          _jquery2.default.each(v.split(","), function (tagIndex, tagVal) {
            dataValue.push(_react2.default.createElement(
              _antd.Tag,
              { color: '#2db7f5', key: tagIndex, style: { marginBottom: "5px" } },
              tagVal
            ));
          });
        }
      }
      break;
    case "_img":
      if (type === "add") {
        dataValue = _react2.default.createElement(_ImgUpload2.default, { url: url });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_ImgUpload2.default, { url: url });
      } else if (type === "show") {
        dataValue = _react2.default.createElement(_ImgModal2.default, { imgSrc: dataValue, height: '150' });
      } else {
        dataValue = _react2.default.createElement(
          'div',
          { style: { height: "150px" } },
          _react2.default.createElement('img', { src: dataValue, height: '150', alt: '' })
        );
      }
      break;
    case "_boolean":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.Checkbox, { onChange: function onChange(value) {
            return value;
          } });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.Checkbox, { onChange: function onChange(value) {
            return value;
          } });
      } else {
        dataValue = dataValue ? "是" : "否";
      }
      break;
    case "_checkbox":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.Checkbox, null);
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.Checkbox, null);
      } else {
        dataValue = dataValue ? "是" : "否";
      }
      break;
    case "_price":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.InputNumber, { min: 0 });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.InputNumber, { min: 0 });
      } else {
        dataValue = "¥" + dataValue;
      }
      break;
    case "_number":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.InputNumber, null);
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.InputNumber, null);
      }
      break;
    case "_int":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.InputNumber, { min: 0 });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.InputNumber, { min: 0 });
      }
      break;
    case "_float":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.InputNumber, { step: 0.1 });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.InputNumber, { step: 0.1 });
      }
      break;
    case "_select":
      if (isLocal) {
        var SelectTpl = _Global2.default.columnsDataSource(k);
        if (type === "add") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelJson: SelectTpl.modelJson,
            modelDataKey: SelectTpl.modelDataKey,
            modelDataValue: SelectTpl.modelDataValue,
            placeholder: SelectTpl.modelDataPlaceholder,
            modelDataLinkage: SelectTpl.modelDataLinkage,
            modelDataColumn: SelectTpl.modelDataColumn,
            modelDataParams: SelectTpl.modelDataParams,
            isLocal: isLocal
          });
        } else if (type === "edit") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelJson: SelectTpl.modelJson,
            modelDataKey: SelectTpl.modelDataKey,
            modelDataValue: SelectTpl.modelDataValue,
            placeholder: SelectTpl.modelDataPlaceholder,
            modelDataLinkage: SelectTpl.modelDataLinkage,
            modelDataColumn: SelectTpl.modelDataColumn,
            modelDataParams: SelectTpl.modelDataParams,
            isLocal: isLocal
          });
        } else {
          _jquery2.default.each(SelectTpl.modelJson.list, function (index, val) {
            if (SelectTpl.modelJson.list[index][SelectTpl.modelDataValue] === dataValue) {
              dataValue = SelectTpl.modelJson.list[index][SelectTpl.modelDataKey];
            }
          });
        }
      } else {
        var _SelectTpl = _Global2.default.columnsDataSource(k);
        if (type === "add") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelUrl: _SelectTpl.modelUrl,
            modelDataKey: _SelectTpl.modelDataKey,
            modelDataValue: _SelectTpl.modelDataValue,
            placeholder: _SelectTpl.modelDataPlaceholder,
            modelDataLinkage: _SelectTpl.modelDataLinkage,
            modelDataColumn: _SelectTpl.modelDataColumn,
            modelDataParams: _SelectTpl.modelDataParams
          });
        } else if (type === "edit") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelUrl: _SelectTpl.modelUrl,
            modelDataKey: _SelectTpl.modelDataKey,
            modelDataValue: _SelectTpl.modelDataValue,
            placeholder: _SelectTpl.modelDataPlaceholder,
            modelDataLinkage: _SelectTpl.modelDataLinkage,
            modelDataColumn: _SelectTpl.modelDataColumn,
            modelDataParams: _SelectTpl.modelDataParams
          });
        } else {
          dataValue = otherVal;
          // console.log(otherVal);
        }
      }

      break;
    case "_id":
      if (isLocal) {
        var idSelectTpl = _Global2.default.columnsDataSource(k);
        if (type === "add") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelJson: idSelectTpl.modelJson,
            modelDataKey: idSelectTpl.modelDataKey,
            modelDataValue: idSelectTpl.modelDataValue,
            placeholder: idSelectTpl.modelDataPlaceholder,
            modelDataLinkage: idSelectTpl.modelDataLinkage,
            modelDataColumn: idSelectTpl.modelDataColumn,
            modelDataParams: idSelectTpl.modelDataParams,
            isLocal: isLocal
          });
        } else if (type === "edit") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelJson: idSelectTpl.modelJson,
            modelDataKey: idSelectTpl.modelDataKey,
            modelDataValue: idSelectTpl.modelDataValue,
            placeholder: idSelectTpl.modelDataPlaceholder,
            modelDataLinkage: idSelectTpl.modelDataLinkage,
            modelDataColumn: idSelectTpl.modelDataColumn,
            modelDataParams: idSelectTpl.modelDataParams,
            isLocal: isLocal
          });
        } else {
          _jquery2.default.each(idSelectTpl.modelJson.list, function (index, val) {
            if (idSelectTpl.modelJson.list[index][idSelectTpl.modelDataValue] === dataValue) {
              dataValue = idSelectTpl.modelJson.list[index][idSelectTpl.modelDataKey];
            }
          });
          // console.log(otherVal);
        }
      } else {
        var _idSelectTpl = _Global2.default.columnsDataSource(k);
        if (type === "add") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelUrl: _idSelectTpl.modelUrl,
            modelDataKey: _idSelectTpl.modelDataKey,
            modelDataValue: _idSelectTpl.modelDataValue,
            placeholder: _idSelectTpl.modelDataPlaceholder,
            modelDataLinkage: _idSelectTpl.modelDataLinkage,
            modelDataColumn: _idSelectTpl.modelDataColumn,
            modelDataParams: _idSelectTpl.modelDataParams
          });
        } else if (type === "edit") {
          dataValue = _react2.default.createElement(_SelectBox2.default, {
            modelUrl: _idSelectTpl.modelUrl,
            modelDataKey: _idSelectTpl.modelDataKey,
            modelDataValue: _idSelectTpl.modelDataValue,
            placeholder: _idSelectTpl.modelDataPlaceholder,
            modelDataLinkage: _idSelectTpl.modelDataLinkage,
            modelDataColumn: _idSelectTpl.modelDataColumn,
            modelDataParams: _idSelectTpl.modelDataParams
          });
        } else {
          dataValue = otherVal;
          // console.log(otherVal);
        }
      }

      break;
    case "_url":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.Input, null);
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.Input, null);
      } else {
        dataValue = _react2.default.createElement(
          'a',
          { href: dataValue },
          dataValue
        );
      }
      break;
    case "_radio":
      if (type === "add") {
        dataValue = _react2.default.createElement(
          RadioGroup,
          null,
          _react2.default.createElement(
            _antd.Radio,
            { value: 'true' },
            '\u662F'
          ),
          _react2.default.createElement(
            _antd.Radio,
            { value: 'false' },
            '\u5426'
          )
        );
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(
          RadioGroup,
          null,
          _react2.default.createElement(
            _antd.Radio,
            { value: 'true' },
            '\u662F'
          ),
          _react2.default.createElement(
            _antd.Radio,
            { value: 'false' },
            '\u5426'
          )
        );
      }
      break;
    case "_email":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.Input, null);
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.Input, null);
      } else {
        var emailLink = "mailto:" + dataValue;
        dataValue = _react2.default.createElement(
          'a',
          { href: emailLink },
          dataValue
        );
      }
      break;
    case "_text":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.Input, null);
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.Input, null);
      }
      break;
    case "password":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.Input, { type: 'password' });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.Input, { type: 'password' });
      }
      break;
    case "_textarea":
      // console.log(1);
      if (type === "add") {
        dataValue = _react2.default.createElement(TextArea, { autosize: { minRows: 2, maxRows: 6 } });
      } else if (type === "show") {
        dataValue = dataValue ? dataValue : "无";
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(TextArea, { autosize: { minRows: 2, maxRows: 6 } });
      } else {
        dataValue = dataValue ? dataValue.length > 50 ? dataValue.substr(0, 50) + "..." : dataValue : "无";
      }
      break;
    case "_editor":
      if (type === "add") {
        dataValue = _react2.default.createElement(_CkBox2.default, null);
      } else if (type === "show") {
        dataValue = dataValue ? dataValue : "无";
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_CkBox2.default, null);
      } else {
        dataValue = dataValue ? dataValue.length > 50 ? dataValue.substr(0, 50) + "..." : dataValue : "无";
      }
      break;
    case "_imgarr":
      if (type === "add") {
        dataValue = _react2.default.createElement(_CkeditorImg2.default, { url: url });
      } else if (type === "show") {
        dataValue = dataValue ? dataValue : "无";
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_CkeditorImg2.default, { url: url });
      } else {
        dataValue = dataValue ? dataValue : "无";
      }
      break;
    case "_manage":
      if (type === "add") {
        dataValue = _react2.default.createElement(_ImgSynchroUpload2.default, { url: url });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_ImgSynchroUpload2.default, { url: url });
      } else if (type === "show") {
        dataValue = _react2.default.createElement(_ImgModal2.default, { imgSrc: dataValue, height: '150' });
      } else {
        dataValue = _react2.default.createElement(
          'div',
          { style: { height: "150px" } },
          _react2.default.createElement('img', { src: dataValue, height: '150', alt: '' })
        );
      }
      break;
    case "_status":
    case "_state":
      var workflow = _Global2.default.columnsDataSource(k);
      if (type === "add") {
        dataValue = dataValue + "";
      } else if (type === "show") {
        _jquery2.default.each(workflow.state, function (key, val) {
          if (key === dataValue + "") {
            dataValue = workflow.state[key].text;
          }
        });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_WorkflowState2.default, { stateObj: workflow, dataId: dataId, updateList: updateList });
      } else {
        dataValue = _react2.default.createElement(_WorkflowState2.default, { actionValue: dataValue, stateObj: workflow, dataId: dataId });
      }
      break;
    case "_datetime":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.DatePicker, {
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '\u9009\u62E9\u65E5\u671F\u65F6\u95F4'
        });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.DatePicker, {
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '\u9009\u62E9\u65E5\u671F\u65F6\u95F4'
        });
      } else {
        dataValue = (0, _FormatDate2.default)(dataValue, "datetime");
      }
      break;
    case "_date":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.DatePicker, { placeholder: '\u9009\u62E9\u65E5\u671F' });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.DatePicker, { placeholder: '\u9009\u62E9\u65E5\u671F' });
      } else {
        dataValue = (0, _FormatDate2.default)(dataValue, "date");
      }
      break;
    case "_at":
      if (type === "add") {
        dataValue = _react2.default.createElement(_antd.DatePicker, {
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '\u9009\u62E9\u65E5\u671F\u65F6\u95F4' });
      } else if (type === "edit") {
        dataValue = _react2.default.createElement(_antd.DatePicker, {
          showTime: true,
          format: 'YYYY-MM-DD HH:mm:ss',
          placeholder: '\u9009\u62E9\u65E5\u671F\u65F6\u95F4' });
      } else {
        dataValue = (0, _FormatDate2.default)(dataValue, "datetime");
      }
      break;
    default:
      dataValue = dataValue + "";

  }
  return dataValue;
};

exports.default = GetColumnTpl;