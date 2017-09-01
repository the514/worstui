'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Global = require('./Global');

var _Global2 = _interopRequireDefault(_Global);

var _Config = require('./Modules/Config');

var _Config2 = _interopRequireDefault(_Config);

var _GetColumnTpl = require('./TplBox/GetColumnTpl');

var _GetColumnTpl2 = _interopRequireDefault(_GetColumnTpl);

var _GetColumnConfig = require('./TplBox/GetColumnConfig');

var _GetColumnConfig2 = _interopRequireDefault(_GetColumnConfig);

var _GetFilterTpl = require('./TplBox/GetFilterTpl');

var _GetFilterTpl2 = _interopRequireDefault(_GetFilterTpl);

var _AddModel = require('./TplBox/AddModel');

var _AddModel2 = _interopRequireDefault(_AddModel);

var _ShowModel = require('./TplBox/ShowModel');

var _ShowModel2 = _interopRequireDefault(_ShowModel);

var _EditModel = require('./TplBox/EditModel');

var _EditModel2 = _interopRequireDefault(_EditModel);

var _antd = require('antd');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Config from '../../../src/Modules/Config';
// 字段模版
// 字段配置
// 筛选模版

// 添加模态框
// 查看模态框
// 编辑模态框

var Content = _antd.Layout.Content;

var List = function (_Component) {
  _inherits(List, _Component);

  function List(props) {
    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

    _this.updateList = function (page, filterText) {

      // if (this.refs.myRef) {

      _Global2.default.LoadingStart();

      var config = _Global2.default.getHeader();

      // console.log(config);

      _axios2.default.get(_Global2.default.getUrl() + _this.props.modelUrl + "?page=" + (page ? page : _this.state.page) + (filterText === "" ? "" : _this.state.filterText), config).then(function (response) {
        if (response.headers["access-token"]) {
          _Global2.default.setTokenHeader(response);
        }
        // console.log(response.headers);
        // console.log(response);

        var data = response.data.list.map(function (data) {
          return data;
        });

        var limit_page = response.data.limit_page;
        var total_page = response.data.total_page;

        var dataList = []; // 数据列表数组
        var dataValue = []; // 字段值 获取字段模版
        var filterTpl = []; // 筛选模版
        var projectUrl = _Global2.default.getUrl(); // 项目url

        var columns = _this.props.columns; // 默认字段参数
        var columnsTh = []; // 过滤是否显示字段

        // console.log(data.length>0);

        // 向每条列表数据的操作按钮增加点击事件 start

        var thisClass = _this;

        _jquery2.default.each(columns, function (index, val) {
          _jquery2.default.each(columns[index], function (k, v) {

            columns[index] = (0, _GetColumnConfig2.default)(columns[index].key, v, columns[index], thisClass);
          });
        });
        // 向每条列表数据的操作按钮增加点击事件 end

        if (data.length > 0) {
          _jquery2.default.each(data, function (index, val) {
            dataValue[index] = val;
            dataValue[index].key = val.id;

            _jquery2.default.each(dataValue[index], function (k, v) {

              _jquery2.default.each(columns, function (i, columnsVal) {
                if (columns[i].key === k) {
                  // console.log(columns[i].listHidden);

                  if (columns[i].listHidden !== true) {
                    // console.log(columns[i].keyName);
                    // console.log(dataValue[index][columns[i].keyName]);
                    dataValue[index][k] = (0, _GetColumnTpl2.default)(k, // 字段名称
                    v, // 模型名称
                    dataValue[index][k], // 默认值
                    "", // 样式类型 [add, show, edit]
                    projectUrl, // 项目地址
                    val.id, // 数据id
                    undefined, // updataList 回调函数
                    columns[i].keyName !== undefined ? dataValue[index][columns[i].keyName] : "", // 分类解释数据字段名
                    columns[i].isLocal // selectbox 是否是本地解释数据
                    ); // 配置字段模版
                  }
                }
              });
            });

            dataList.push(dataValue[index]); // 将字段对象添加到数组
          });
        }

        // this.setState({
        //   data: dataList,        // 字段数组对象赋值给state.data
        //   limit_page: limit_page,// 设置每页显示数量
        //   total_page: total_page // 设置总页数
        // });

        // this.setState({limit_page: limit_page}); // 设置每页显示数量
        // this.setState({total_page: total_page}); // 设置总页数

        // if (filterText==="") {
        //   this.setState({
        //     filterTpl: null   // 筛选数组赋值给state.filterTpl
        //   });
        // }

        _jquery2.default.each(columns, function (i, v) {
          if (columns[i].listHidden !== true) {
            columnsTh.push(columns[i]);
          }

          if (columns[i].filter_key && columns[i].filter_type && columns[i].filter_placeholder) {
            filterTpl.push(_react2.default.createElement(_GetFilterTpl2.default, { filterKey: columns[i].filter_key,
              type: columns[i].filter_type,
              key: i,
              pHolder: columns[i].filter_placeholder,
              onChange: thisClass.filterHandleChange,
              val: thisClass.state.filterTextObj }));
          }
        });

        // console.log(columns);
        if (filterText === "") {
          _this.setState({
            data: dataList, // 字段数组对象赋值给state.data
            limit_page: limit_page, // 设置每页显示数量
            total_page: total_page, // 设置总页数
            columns: columnsTh, // 增加操作事件的字段对象赋值给state.columns
            filterTpl: null // 筛选数组赋值给state.filterTpl
          });

          _this.setState({
            filterTpl: filterTpl // 筛选数组赋值给state.filterTpl
          });
        } else {
          _this.setState({
            data: dataList, // 字段数组对象赋值给state.data
            limit_page: limit_page, // 设置每页显示数量
            total_page: total_page, // 设置总页数
            columns: columnsTh, // 增加操作事件的字段对象赋值给state.columns
            filterTpl: filterTpl // 筛选数组赋值给state.filterTpl
          });
        }

        _Global2.default.LoadingEnd();
      }).catch(function (error) {
        // Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
        console.log(error);
        _Global2.default.getAuth(error);
        _Global2.default.LoadingEnd();
      });

      // }
    };

    _this.filterHandleChange = function (e, dataString) {
      // 筛选字段 onChange 事件
      // console.log(dataString);
      var filter_result = _this.state.filterTextObj;

      console.log(filter_result);

      if (dataString !== undefined) {
        filter_result[e.target.getAttribute("data-filter")] = dataString;
      } else {
        filter_result[e.target.getAttribute("data-filter")] = e.target.value;
      }
      // console.log(e.target.getAttribute("data-filter"));

      // console.log(filter_result);

      // this.setState({
      //   filterTextObj: filter_result
      // });
      var filterParams = "";

      _jquery2.default.each(filter_result, function (k, v) {
        if (v !== "" && v !== undefined && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) !== 'object') {
          filterParams += "&" + k + "=" + v;
        } else if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
          // 如果筛选返回的是对象
          _jquery2.default.each(v, function (key, val) {
            if (val !== "" && val !== undefined) {
              filterParams += "&" + key + "=" + val;
            }
          });
        }
      });

      console.log(filterParams);
      _this.setState({
        filterTextObj: filter_result,
        filterText: filterParams
      });
    };

    _this.filterHandleReload = function (e) {

      _this.setState({
        filterTextObj: {},
        filterText: ""
      });

      _this.updateList(false, "");
    };

    _this.filterHandleClick = function (e) {
      _this.updateList();
    };

    _this.onSelectChange = function (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      _this.setState({ selectedRowKeys: selectedRowKeys });
    };

    _this.onPageChange = function (page, pageSize) {
      _this.setState({
        page: page
      });

      _this.updateList(page, false);
      // console.log(page);
      // console.log(pageSize);
    };

    _this.handleShowCancel = function () {
      _this.setState({
        showVisible: false
      });

      setTimeout(function () {
        (0, _jquery2.default)(".showModel .ant-modal-content").scrollTop(0);
      }, 200);
    };

    _this.handleEditCancel = function (e) {

      _this.setState({
        editVisible: false
      });

      _this.form.resetFields();

      setTimeout(function () {
        (0, _jquery2.default)(".editModel .ant-modal-content").scrollTop(0);
      }, 200);
    };

    _this.handleEditCreate = function (e) {
      var form = _this.form;

      form.validateFields(function (err, fieldsValue) {
        if (err) {
          console.log(fieldsValue);
          return;
        }
        // console.log(fieldsValue);

        if (_Config2.default.jsonRequestType() === "object") {
          _jquery2.default.each(fieldsValue, function (k, v) {

            var regExp = /(_){1}[^_]+$/;
            var textIndex = k.search(regExp);
            switch (textIndex > -1 ? k.slice(textIndex) : 0) {
              case "_tag":
                // 标签类型字段需要重新用逗号分隔
                if (!Array.isArray(fieldsValue[k])) {
                  _jquery2.default.each(fieldsValue[k].split(","), function (tagIndex, tagVal) {
                    tagIndex === 0 ? fieldsValue[k] = tagVal : fieldsValue[k] += "," + tagVal;
                  });
                } else {
                  _jquery2.default.each(fieldsValue[k], function (tagIndex, tagVal) {
                    tagIndex === 0 ? fieldsValue[k] = tagVal : fieldsValue[k] += "," + tagVal;
                  });
                }

                break;
              case "_datetime":
                // 日期moment类型需要重新转换成日期字符串
                fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
                break;
              case "_at":
                // 日期moment类型需要重新转换成日期字符串
                fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
                break;
              case "_date":
                // 日期moment类型需要重新转换成日期字符串
                fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD');
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
                  // 标签类型字段需要重新用逗号分隔
                  if (!Array.isArray(fieldsValue[index][k])) {
                    _jquery2.default.each(fieldsValue[index][k].split(","), function (tagIndex, tagVal) {
                      tagIndex === 0 ? fieldsValue[index][k] = tagVal : fieldsValue[index][k] += "," + tagVal;
                    });
                  } else {
                    _jquery2.default.each(fieldsValue[index][k], function (tagIndex, tagVal) {
                      tagIndex === 0 ? fieldsValue[index][k] = tagVal : fieldsValue[index][k] += "," + tagVal;
                    });
                  }

                  break;
                case "_datetime":
                  // 日期moment类型需要重新转换成日期字符串
                  fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  break;
                case "_at":
                  // 日期moment类型需要重新转换成日期字符串
                  fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  break;
                case "_date":
                  // 日期moment类型需要重新转换成日期字符串
                  fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD');
                  break;
                default:
              }
            });
          });
        }

        // console.log('Received values of form: ', fieldsValue);

        _Global2.default.LoadingStart();

        var config = _Global2.default.getHeader();

        var params = fieldsValue;

        _axios2.default.put(_Global2.default.getUrl() + _this.props.modelUrl + "/" + _this.state.dataId, params, config).then(function (response) {
          if (response.headers["access-token"]) {
            _Global2.default.setTokenHeader(response);
          }
          // console.log(response.headers);

          _this.updateList();
          _Global2.default.openNotification({ type: "success", title: "操作成功", body: _this.props.updateTips });
          _Global2.default.LoadingEnd();
        }).catch(function (error) {
          _Global2.default.openNotification({ type: "error", title: "操作失败", body: "请求超时，请刷新重试！" });
          console.log(error);
          _Global2.default.getAuth(error);
          _Global2.default.LoadingEnd();
        });

        form.resetFields();
        _this.setState({
          editVisible: false,
          newKey: _this.state.newKey + 1
        });
      });
    };

    _this.saveFormRef = function (form) {
      _this.form = form;
    };

    _this.state = {
      selectedRowKeys: [], // 多选字段
      data: [], // 列表数据
      dataId: null, // 当前数据id
      columns: [], // 字段参数
      // visible: false,
      showVisible: false,
      editVisible: false,
      modalVisible: null,
      showData: null, // 查看数据源
      editData: null, // 编辑数据源
      page: 1, // 当前页数
      limit_page: 1, // 每页条数
      total_page: 1, // 总页数
      columnsWidth: 0, // 列表总宽度

      filterTpl: null, // 筛选模版
      filterTextObj: {}, // 筛选内容对象
      filterText: "" // 筛选内容
    };

    _this.filterHandleChange = _this.filterHandleChange.bind(_this);
    _this.filterHandleReload = _this.filterHandleReload.bind(_this);
    return _this;
  }

  _createClass(List, [{
    key: 'componentDidMount',
    value: function componentDidMount(props) {

      // const config = Global.getHeader();

      // axios.get(Global.getUrl() + "/news?page=1", config)
      //   .then(response => {
      //     if (response.headers["access-token"]) {
      //       Global.setTokenHeader(response);
      //     }

      //     this.updateList();
      //     Global.LoadingEnd();

      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //     Global.getAuth(error);
      //     Global.LoadingEnd();
      //   });
      this.updateList();
    }
  }, {
    key: 'render',
    value: function render() {
      // console.log(this.props.listsTitle);
      var selectedRowKeys = this.state.selectedRowKeys;

      var rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onChange: this.onSelectChange,
        selections: [
          // {
          //   key: 'all-data',
          //   text: 'Select All Data',
          //   onSelect: (changableRowKeys) => {
          //     this.setState({
          //       selectedRowKeys: changableRowKeys,
          //     });
          //   },
          // }, 
          // {
          //   key: 'odd',
          //   text: 'Select Odd Row',
          //   onSelect: (changableRowKeys) => {
          //     let newSelectedRowKeys = [];
          //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
          //       if (index % 2 !== 0) {
          //         return false;
          //       }
          //       return true;
          //     });
          //     this.setState({ selectedRowKeys: newSelectedRowKeys });
          //   },
          // }, 
          // {
          //   key: 'even',
          //   text: 'Select Even Row',
          //   onSelect: (changableRowKeys) => {
          //     let newSelectedRowKeys = [];
          //     newSelectedRowKeys = changableRowKeys.filter((key, index) => {
          //       if (index % 2 !== 0) {
          //         return true;
          //       }
          //       return false;
          //     });
          //     this.setState({ selectedRowKeys: newSelectedRowKeys });
          //   },
          // }
        ],
        onSelection: this.onSelection
      };

      var showVisible = null;
      if (this.state.showVisible) {
        showVisible = _react2.default.createElement(_ShowModel2.default, {
          visible: this.state.showVisible,
          onCancel: this.handleShowCancel,
          columns: this.props.columns,
          title: this.props.showTitle,
          url: _Global2.default.getUrl(),
          dataSource: this.state.showData,
          updateList: this.updateList
        });
      }

      var editVisible = null;
      if (this.state.editVisible) {
        editVisible = _react2.default.createElement(_EditModel2.default, {
          visible: this.state.editVisible,
          onCancel: this.handleEditCancel,
          onCreate: this.handleEditCreate,
          columns: this.props.columns
          // key={this.props.dataId}
          // dataId={this.props.dataId}
          , ref: this.saveFormRef,
          title: this.props.editTitle,
          url: _Global2.default.getUrl(),
          model: this.props.model,
          modelUrl: this.props.modelUrl,
          dataSource: this.state.editData,
          updateList: this.updateList
        });
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Breadcrumb,
          { style: { margin: '12px 0 12px 16px' } },
          _react2.default.createElement(
            _antd.Breadcrumb.Item,
            null,
            '\u4E3B\u9875'
          ),
          _react2.default.createElement(
            _antd.Breadcrumb.Item,
            null,
            this.props.listsTitle
          )
        ),
        _react2.default.createElement(
          Content,
          { style: { margin: '0 16px' } },
          _react2.default.createElement(
            'div',
            { style: { padding: 24, background: '#fff' } },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_AddModel2.default, {
                columns: this.props.columns,
                title: this.props.addTitle,
                url: _Global2.default.getUrl(),
                model: this.props.model,
                modelUrl: this.props.modelUrl,
                updateList: this.updateList,
                addTips: this.props.addTips
              }),
              showVisible,
              editVisible,
              _react2.default.createElement(
                'div',
                { className: 'clearfix filter-box' },
                this.state.filterTpl,
                this.state.filterTpl && this.state.filterTpl.length > 0 && _react2.default.createElement(
                  _antd.Button,
                  { icon: 'search', onClick: this.filterHandleClick, style: { marginRight: 5 } },
                  '\u7B5B\u9009'
                ),
                this.state.filterTpl && this.state.filterTpl.length > 0 && _react2.default.createElement(
                  _antd.Button,
                  { icon: 'reload', onClick: this.filterHandleReload },
                  '\u91CD\u7F6E'
                )
              ),
              _react2.default.createElement(_antd.Table, {
                rowSelection: rowSelection,
                columns: this.state.columns,
                dataSource: this.state.data,
                scroll: { x: this.props.tableWidth[this.props.model] ? this.props.tableWidth[this.props.model] : 0 },
                pagination: {
                  onChange: this.onPageChange,
                  defaultPageSize: this.state.limit_page,
                  pageSize: this.state.limit_page,
                  total: this.state.total_page * this.state.limit_page,
                  current: this.state.page
                }
              })
            )
          )
        )
      );
    }
  }]);

  return List;
}(_react.Component);

// export class List;


exports.default = List;