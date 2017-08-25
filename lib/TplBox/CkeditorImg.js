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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Config = require('../Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import ReactDOM from 'react-dom';


var CkeditorImg = function (_Component) {
  _inherits(CkeditorImg, _Component);

  function CkeditorImg(props) {
    _classCallCheck(this, CkeditorImg);

    var _this = _possibleConstructorReturn(this, (CkeditorImg.__proto__ || Object.getPrototypeOf(CkeditorImg)).call(this, props));

    _this.handleCancel = function () {
      return _this.setState({ previewVisible: false });
    };

    _this.handlePreview = function (file) {
      _this.setState({
        previewImage: ""
      });
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
      // console.log(this.state.fileList);

      var fileArr = fileList;
      var fileListArr = _this.state.fileList;
      _jquery2.default.each(fileListArr, function (index, val) {
        if (fileArr[index] && fileArr[index].status === 'done') {
          fileArr[index].url = fileListArr[index].url;
        }
      });

      if (fileArr !== []) {
        _this.setState({
          fileList: fileArr
        });
      } else {
        _this.triggerChange('');
      }
    };

    _this.handleSuccess = function (result, file) {
      // console.log(result);
      // console.log(file);

      var fileArr = _this.state.fileList;
      fileArr.pop();
      var fileArrResult = [];
      fileArr.push(result);

      _jquery2.default.each(fileArr, function (index, val) {
        fileArrResult.push(fileArr[index].url);
      });

      // console.log(fileArrResult.join(','));
      _this.triggerChange(fileArrResult.join(','));
    };

    _this.handleRemove = function (file) {
      // const config = Global.getHeader();
      var config = _Global2.default.getHeader();

      console.log(_Global2.default.getUrl() + _Config2.default.uploadImgUrl() + "/" + file.id);
      var thisClass = _this;
      _axios2.default.delete(_Global2.default.getUrl() + _Config2.default.uploadImgUrl() + "/" + file.id, config).then(function (response) {
        console.log(response.headers);
        if (response.headers["access-token"]) {
          _Global2.default.setTokenHeader(response);
        }
        _Global2.default.openNotification({ type: "success", title: "操作成功", body: "图片已删除。" });

        var fileList = _this.state.fileList;
        var fileListResult = [];
        var fileArrResult = [];

        _jquery2.default.each(fileList, function (index, val) {
          if (fileList[index].id !== file.id) {
            fileListResult.push(fileList[index]);
            fileArrResult.push(fileList[index].url);
          }
        });
        _this.setState({
          fileList: fileListResult
        });
        if (fileListResult !== []) {
          _this.triggerChange(fileArrResult.join(','));
        } else {
          _this.triggerChange('');
        }

        _Global2.default.LoadingEnd();
      }).catch(function (error) {
        console.log(error);
        console.log(error.response);
        if (error.response.status === 404) {
          _Global2.default.openNotification({ type: "success", title: "操作成功", body: "图片已删除。" });

          var fileList = thisClass.state.fileList;
          var fileListResult = [];
          var fileArrResult = [];
          console.log(fileList);

          _jquery2.default.each(fileList, function (index, val) {
            if (fileList[index].id !== file.id) {
              fileListResult.push(fileList[index]);
              fileArrResult.push(fileList[index].url);
            }
          });

          thisClass.setState({
            fileList: fileListResult
            // fileListShowPic: fileListResult
          });

          if (fileListResult !== []) {
            thisClass.triggerChange(fileArrResult.join(','));
          } else {
            thisClass.triggerChange('');
          }
        } else {
          _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
        }
        _Global2.default.getAuth(error);
        _Global2.default.LoadingEnd();
      });
    };

    _this.triggerChange = function (changedValue) {
      // Should provide an event to pass value to Form.

      var onChange = _this.props.onChange;
      if (onChange) {

        // console.log(changedValue);
        onChange(Object.assign(changedValue));
      }
    };

    _this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
      // fileListShowPic: [],
    };
    _this.clipboard = _this.clipboard.bind(_this);
    return _this;
  }

  _createClass(CkeditorImg, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {
      // 如果出现length方法不能作用于undefined的报错 是配置项的错误此行代码没有错
      if (this.props.fileList !== undefined && this.props.fileList !== null && this.props.fileList !== "" && this.props.fileList.length !== 0) {

        var filelistArr = [];

        var fileArr = this.props.fileList.split(",");
        // console.log(fileArr);
        // let thisClass = this;
        _jquery2.default.each(fileArr, function (index, val) {

          var fileUrlArr = fileArr[index].split("/");
          var fileUrlArrLength = fileArr[index].split("/").length;
          var filelist = {};
          filelist.uid = index;
          filelist.key = index;
          filelist.id = fileUrlArr[fileUrlArrLength - 2];
          filelist.name = fileArr[index];
          filelist.status = "done";
          filelist.url = fileArr[index];
          filelist.thumbUrl = fileArr[index];

          filelistArr.push(filelist);
          // filelistArrShowPic.push(filelistShowPic);
        });

        // console.log(filelistArr);
        this.setState({
          fileList: filelistArr
          // fileListShowPic: filelistArrShowPic
        });
      } else {
        this.setState({
          fileList: []
          // fileListShowPic: []
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var thisClass = this;

      (0, _jquery2.default)(".btnClipList .btnCkeditorImgUrl").each(function (index, el) {
        (0, _jquery2.default)(".btnClipDoneList .ant-upload-list-item-done").eq(index).find(".ant-upload-list-item-actions").find(".btnCkeditorImgUrl").remove();
        (0, _jquery2.default)(".btnClipDoneList .ant-upload-list-item-done").eq(index).find(".ant-upload-list-item-actions").append((0, _jquery2.default)(this).clone());
      });

      // on('click', '.selector', function(event) {
      //   event.preventDefault();
      //   /* Act on the event */
      // });

      (0, _jquery2.default)(".btnCkeditorImgUrl").click(function (event) {
        thisClass.clipboard();
      });
    }
  }, {
    key: 'clipboard',
    value: function clipboard() {
      _Global2.default.openNotification({ type: "success", title: "操作成功", body: "图片链接已复制。" });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      // console.log(this.props.fileList.length);
      if (this.props.fileList !== null && this.props.fileList !== "" && this.props.fileList.length !== 0) {

        var filelistArr = [];

        var fileArr = this.props.fileList.split(",");
        // console.log(fileArr);
        // let thisClass = this;
        _jquery2.default.each(fileArr, function (index, val) {

          var fileUrlArr = fileArr[index].split("/");
          var fileUrlArrLength = fileArr[index].split("/").length;
          var filelist = {};
          filelist.uid = index;
          filelist.key = index;
          filelist.id = fileUrlArr[fileUrlArrLength - 2];
          filelist.name = fileArr[index];
          filelist.status = "done";
          filelist.url = fileArr[index];
          filelist.thumbUrl = fileArr[index];

          filelistArr.push(filelist);
        });

        // console.log(filelistArr);
        this.setState({
          fileList: filelistArr
        });
      } else {
        this.setState({
          fileList: []
          // fileListShowPic: []
        });
      }
    }
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

      // const copyTips = "复制成功!";

      return _react2.default.createElement(
        'div',
        { className: 'clearfix btnClipDoneList' },
        _react2.default.createElement(
          _antd.Upload,
          {
            name: _Config2.default.uploadImgColumnName(),
            action: _Global2.default.getUrl() + _Config2.default.uploadImgUrl() + "/",
            listType: 'picture-card',
            defaultFileList: fileList,
            fileList: fileList,
            headers: _Global2.default.getHeader(),
            onPreview: this.handlePreview,
            onChange: this.handleChange,
            onRemove: this.handleRemove,
            onSuccess: this.handleSuccess
          },
          fileList.length >= 20 ? null : uploadButton
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
        _react2.default.createElement(
          'div',
          { className: 'btnClipList', style: { display: 'none' } },
          fileList.map(function (file) {
            return _react2.default.createElement('i', { title: '\u590D\u5236\u94FE\u63A5', key: file.uid, className: 'anticon anticon-copy btnClip btnCkeditorImgUrl', 'data-clipboard-text': file.url });
          })
        )
      );
    }
  }]);

  return CkeditorImg;
}(_react.Component);

exports.default = CkeditorImg;
//# sourceMappingURL=CkeditorImg.js.map