'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Global = require('../Global');

var _Global2 = _interopRequireDefault(_Global);

var _antd = require('antd');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _Config = require('../Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Config from '../../../../src/Modules/Config';


var confirm = _antd.Modal.confirm;

var ImgUpload = function (_Component) {
  _inherits(ImgUpload, _Component);

  function ImgUpload(props) {
    _classCallCheck(this, ImgUpload);

    var _this = _possibleConstructorReturn(this, (ImgUpload.__proto__ || Object.getPrototypeOf(ImgUpload)).call(this, props));

    _this.handleCancel = function () {
      return _this.setState({ previewVisible: false });
    };

    _this.handlePreview = function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    };

    _this.handleChange = function (_ref) {
      var file = _ref.file,
          fileList = _ref.fileList,
          event = _ref.event;


      // console.log(file);
      // console.log(fileList);
      // console.log(event);

      _this.setState({ fileList: fileList });
    };

    _this.handleSuccess = function (result, file) {
      // console.log(result);
      // console.log(file);

      _this.setState({
        fileList: [result]
      });
      _this.triggerChange(result.url);
    };

    _this.handleRemove = function (file) {
      // const config = Global.getHeader();
      var thisClass = _this;
      // console.log(file);
      confirm({
        title: '确定删除?',
        // content: 'Some descriptions',
        onOk: function onOk() {

          var config = _Global2.default.getHeader();
          // console.log(thisClass.props.url + Config.uploadImgUrl() + "/" + file.uid);
          _axios2.default.delete(thisClass.props.url + _Config2.default.uploadImgUrl() + "/" + file.uid, config).then(function (response) {
            console.log(response.headers);
            if (response.headers["access-token"]) {
              _Global2.default.setTokenHeader(response);
            }
            _Global2.default.openNotification({ type: "success", title: "操作成功", body: "图片已删除。" });
            thisClass.triggerChange("");
            _Global2.default.LoadingEnd();
          }).catch(function (error) {
            console.log(error);
            if (error.response.status === 404) {
              _Global2.default.openNotification({ type: "success", title: "操作成功", body: "图片已删除。" });
              thisClass.triggerChange("");
            } else {
              _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
            }
            _Global2.default.getAuth(error);
            _Global2.default.LoadingEnd();
          });
        },
        onCancel: function onCancel() {
          // console.log('Cancel');
          var filelistArr = [];
          var filelist = {};

          filelist.uid = file.uid;
          filelist.name = file.name;
          filelist.status = "done";
          filelist.url = file.url;
          filelistArr.push(filelist);
          // console.log(filelistArr);
          thisClass.setState({ fileList: filelistArr });
        }
      });
    };

    _this.triggerChange = function (changedValue) {
      // Should provide an event to pass value to Form.

      var onChange = _this.props.onChange;
      if (onChange) {
        console.log(changedValue);
        onChange(changedValue);
      }
    };

    _this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
    return _this;
  }

  _createClass(ImgUpload, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {
      this.setState({ fileList: [] });
      // console.log(this.props.fileList);
      if (this.props.fileList !== null && this.props.fileList !== "" && this.props.fileList !== undefined) {
        if (this.props.fileList !== "") {
          var filelistArr = [];
          var filelist = {};
          // console.log(this.props.fileList.split("/"));
          // console.log(this.props.fileList.split("/").length);
          if (this.props.fileList.indexOf("/") > 1) {
            // console.log("进到里面");
            var fileUrlArr = this.props.fileList.split("/");
            var fileUrlArrLength = this.props.fileList.split("/").length;
            // console.log(fileUrlArr[fileUrlArrLength - 2]);
            filelist.uid = fileUrlArr[fileUrlArrLength - 2];
            filelist.name = this.props.fileList;
            filelist.status = "done";
            filelist.url = this.props.fileList;

            filelistArr.push(filelist);
          }

          // console.log(filelistArr);
          this.setState({ fileList: filelistArr });
        } else {
          this.setState({ fileList: [] });
        }
      } else {
        this.setState({ fileList: [] });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {}
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage,
          fileList = _state.fileList;

      var uploadButton = _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'plus' }),
        _react2.default.createElement(
          'div',
          { className: 'ant-upload-text' },
          '\u4E0A\u4F20\u56FE\u7247'
        )
      );
      var copyTips = "复制成功!";

      return _react2.default.createElement(
        'div',
        { className: 'clearfix' },
        _react2.default.createElement(
          _antd.Upload,
          {
            name: _Config2.default.uploadImgColumnName(),
            action: this.props.url + _Config2.default.uploadImgUrl() + "/",
            listType: 'picture-card',
            defaultFileList: fileList,
            fileList: fileList,
            onPreview: this.handlePreview,
            onChange: this.handleChange,
            onRemove: this.handleRemove,
            onSuccess: this.handleSuccess
          },
          fileList.length >= 1 ? null : uploadButton
        ),
        _react2.default.createElement(
          _antd.Modal,
          {
            wrapClassName: 'vertical-center-modal',
            width: "auto",
            visible: previewVisible,
            footer: null,
            onCancel: this.handleCancel
          },
          _react2.default.createElement('img', { alt: 'img', style: { width: '100%' }, src: previewImage })
        ),
        fileList.length >= 1 && _react2.default.createElement(
          'div',
          { className: 'clearfix', style: { clear: 'both', width: '100%' } },
          _react2.default.createElement(
            _antd.Popover,
            { content: copyTips, title: null, trigger: 'click' },
            _react2.default.createElement(
              _antd.Button,
              { className: 'btnClip', type: 'primary', style: { width: '96px' }, 'data-clipboard-text': this.props.fileList, ghost: true },
              '\u590D\u5236\u94FE\u63A5'
            )
          )
        )
      );
    }
  }]);

  return ImgUpload;
}(_react.Component);

exports.default = ImgUpload;