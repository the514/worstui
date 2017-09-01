import React, { Component } from 'react';
import Global from './Global';
// import Config from '../../../src/Modules/Config';
import Config from './Modules/Config';

import GetColumnTpl from './TplBox/GetColumnTpl';       // 字段模版
import GetColumnConfig from './TplBox/GetColumnConfig'; // 字段配置
import GetFilterTpl from './TplBox/GetFilterTpl';       // 筛选模版

import AddModel from './TplBox/AddModel';   // 添加模态框
import ShowModel from './TplBox/ShowModel'; // 查看模态框
import EditModel from './TplBox/EditModel'; // 编辑模态框

import { Table, Button, Layout, Breadcrumb} from 'antd';

import axios from 'axios';
import $ from 'jquery';

const { Content } = Layout;

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedRowKeys: [], // 多选字段
      data: [],            // 列表数据
      dataId: null,        // 当前数据id
      columns: [],         // 字段参数
      // visible: false,
      showVisible: false,
      editVisible: false,
      modalVisible: null,
      showData: null,      // 查看数据源
      editData: null,      // 编辑数据源
      page: 1,             // 当前页数
      limit_page: 1,       // 每页条数
      total_page: 1,       // 总页数
      columnsWidth: 0,     // 列表总宽度

      filterTpl: null,     // 筛选模版
      filterTextObj: {},   // 筛选内容对象
      filterText: "",      // 筛选内容
    };

    this.filterHandleChange = this.filterHandleChange.bind(this);
    this.filterHandleReload = this.filterHandleReload.bind(this);
  }

  componentDidMount(props) {

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

  updateList = (page, filterText) => {

    // if (this.refs.myRef) {

      Global.LoadingStart();

      const config = Global.getHeader();

      // console.log(config);
    
      axios.get(Global.getUrl() + this.props.modelUrl + "?page=" + (page?page:this.state.page) + (filterText===""?"":this.state.filterText), config)
        .then(response => {
          if (response.headers["access-token"]) {
            Global.setTokenHeader(response);
          }
          // console.log(response.headers);
          // console.log(response);

          const data = response.data.list.map(data => data);

          const limit_page = response.data.limit_page;
          const total_page = response.data.total_page;

          let dataList = [];                                    // 数据列表数组
          let dataValue = [];                                   // 字段值 获取字段模版
          let filterTpl = [];                                   // 筛选模版
          let projectUrl = Global.getUrl();                     // 项目url

          let columns = this.props.columns;                     // 默认字段参数
          let columnsTh = [];                                   // 过滤是否显示字段

          // console.log(data.length>0);

          // 向每条列表数据的操作按钮增加点击事件 start

          var thisClass = this;

          $.each(columns, function(index, val) {
            $.each(columns[index], function(k, v) {

              columns[index] = GetColumnConfig(columns[index].key, v, columns[index], thisClass);

            });
          });
          // 向每条列表数据的操作按钮增加点击事件 end

          if (data.length>0) {
            $.each(data, function(index, val) {
              dataValue[index] = val;
              dataValue[index].key = val.id;

              $.each(dataValue[index], function(k, v) {

                $.each(columns, function(i, columnsVal) {
                  if (columns[i].key === k) {
                    // console.log(columns[i].listHidden);

                    if(columns[i].listHidden !== true){
                      // console.log(columns[i].keyName);
                      // console.log(dataValue[index][columns[i].keyName]);
                      dataValue[index][k] = GetColumnTpl(
                                              k,                   // 字段名称
                                              v,                   // 模型名称
                                              dataValue[index][k], // 默认值
                                              "",                  // 样式类型 [add, show, edit]
                                              projectUrl,          // 项目地址
                                              val.id,              // 数据id
                                              undefined,           // updataList 回调函数
                                              columns[i].keyName!==undefined?dataValue[index][columns[i].keyName]:"",  // 分类解释数据字段名
                                              columns[i].isLocal   // selectbox 是否是本地解释数据
                                            );                     // 配置字段模版
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
          
          $.each(columns, function(i, v) {
            if(columns[i].listHidden !== true){
              columnsTh.push(columns[i]);
            }
            
            if (columns[i].filter_key && columns[i].filter_type && columns[i].filter_placeholder) {
              filterTpl.push(
                <GetFilterTpl filterKey={columns[i].filter_key}
                              type={columns[i].filter_type}
                              key={i}
                              pHolder={columns[i].filter_placeholder}
                              onChange={thisClass.filterHandleChange}
                              val={thisClass.state.filterTextObj} />
              );
            }
          });

          // console.log(columns);
          if (filterText==="") {
            this.setState({
              data: dataList,         // 字段数组对象赋值给state.data
              limit_page: limit_page, // 设置每页显示数量
              total_page: total_page, // 设置总页数
              columns: columnsTh,     // 增加操作事件的字段对象赋值给state.columns
              filterTpl: null         // 筛选数组赋值给state.filterTpl
            });

            this.setState({
              filterTpl: filterTpl    // 筛选数组赋值给state.filterTpl
            });
          }else{
            this.setState({
              data: dataList,         // 字段数组对象赋值给state.data
              limit_page: limit_page, // 设置每页显示数量
              total_page: total_page, // 设置总页数
              columns: columnsTh,     // 增加操作事件的字段对象赋值给state.columns
              filterTpl: filterTpl    // 筛选数组赋值给state.filterTpl
            });
          }

          Global.LoadingEnd();

        })
        .catch(function (error) {
          // Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
          console.log(error);
          Global.getAuth(error);
          Global.LoadingEnd();
        });

    // }

  }

  filterHandleChange = (e, dataString) => { // 筛选字段 onChange 事件
    // console.log(dataString);
    let filter_result = this.state.filterTextObj;

    console.log(filter_result);

    if (dataString!==undefined) {
      filter_result[e.target.getAttribute("data-filter")] = dataString;
    }else{
      filter_result[e.target.getAttribute("data-filter")] = e.target.value;
    }
    // console.log(e.target.getAttribute("data-filter"));

    // console.log(filter_result);

    // this.setState({
    //   filterTextObj: filter_result
    // });
    let filterParams = "";

    $.each(filter_result, function(k, v) {
      if (v!=="" && v!==undefined && typeof(v) !== 'object') {
        filterParams += "&" + k + "=" + v;
      }else if (typeof(v) === 'object') { // 如果筛选返回的是对象
        $.each(v, function(key, val) {
          if (val!=="" && val!==undefined) {
            filterParams += "&" + key + "=" + val;
          }
        });
      }
    });

    console.log(filterParams);
    this.setState({
      filterTextObj: filter_result,
      filterText: filterParams
    });
  }

  filterHandleReload = (e) => {

    this.setState({
      filterTextObj: {},
      filterText: ""
    });

    this.updateList(false, "");

  }

  filterHandleClick = (e) => {
    this.updateList();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  onPageChange = (page, pageSize) => {
    this.setState({
      page: page
    });

    this.updateList(page, false);
    // console.log(page);
    // console.log(pageSize);
  }

  handleShowCancel = () => {
    this.setState({ 
      showVisible: false
    });

    setTimeout((function(){
      $(".showModel .ant-modal-content").scrollTop(0);
    }), 200);
  }

  handleEditCancel = (e) => {

    this.setState({ 
      editVisible: false
    });

    this.form.resetFields();

    setTimeout((function(){
      $(".editModel .ant-modal-content").scrollTop(0);
    }), 200);
  }

  handleEditCreate = (e) => {
    const form = this.form;
    
    form.validateFields((err, fieldsValue) => {
      if (err) {
        console.log(fieldsValue);
        return;
      }
      // console.log(fieldsValue);

      if ( Config.jsonRequestType() === "object" ){
        $.each(fieldsValue, function(k, v) {

          let regExp = /(_){1}[^_]+$/;
          let textIndex = k.search(regExp);
          switch(textIndex>-1?k.slice(textIndex):0){
            case "_tag":      // 标签类型字段需要重新用逗号分隔
              if (!Array.isArray(fieldsValue[k])) {
                $.each(fieldsValue[k].split(","), function(tagIndex, tagVal) {
                  tagIndex===0?fieldsValue[k] = tagVal:fieldsValue[k] += ","+tagVal;
                });
              }else{
                $.each(fieldsValue[k], function(tagIndex, tagVal) {
                  tagIndex===0?fieldsValue[k] = tagVal:fieldsValue[k] += ","+tagVal;
                });
              }

              break;
            case "_datetime": // 日期moment类型需要重新转换成日期字符串
              fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
              break;
            case "_at":       // 日期moment类型需要重新转换成日期字符串
              fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
              break;
            case "_date":     // 日期moment类型需要重新转换成日期字符串
              fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD');
              break;
            default:
          }

        });
      }else{
        $.each(fieldsValue, function(index, val) {
           $.each(fieldsValue[index], function(k, v) {

              let regExp = /(_){1}[^_]+$/;
              let textIndex = k.search(regExp);
              switch(textIndex>-1?k.slice(textIndex):0){
                case "_tag":      // 标签类型字段需要重新用逗号分隔
                  if (!Array.isArray(fieldsValue[index][k])) {
                    $.each(fieldsValue[index][k].split(","), function(tagIndex, tagVal) {
                      tagIndex===0?fieldsValue[index][k] = tagVal:fieldsValue[index][k] += ","+tagVal;
                    });
                  }else{
                    $.each(fieldsValue[index][k], function(tagIndex, tagVal) {
                      tagIndex===0?fieldsValue[index][k] = tagVal:fieldsValue[index][k] += ","+tagVal;
                    });
                  }

                  break;
                case "_datetime": // 日期moment类型需要重新转换成日期字符串
                  fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  break;
                case "_at":       // 日期moment类型需要重新转换成日期字符串
                  fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  break;
                case "_date":     // 日期moment类型需要重新转换成日期字符串
                  fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD');
                  break;
                default:
              }

           });
        });
      }

      // console.log('Received values of form: ', fieldsValue);

      Global.LoadingStart();

      const config = Global.getHeader();

      const params = fieldsValue;

      axios.put(Global.getUrl() + this.props.modelUrl + "/" + this.state.dataId, params, config)
        .then(response => {
          if (response.headers["access-token"]) {
            Global.setTokenHeader(response);
          }
          // console.log(response.headers);

          this.updateList();
          Global.openNotification({type:"success", title:"操作成功", body:this.props.updateTips});
          Global.LoadingEnd();

        })
        .catch(function (error) {
          Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
          console.log(error);
          Global.getAuth(error);
          Global.LoadingEnd();
        });

      form.resetFields();
      this.setState({ 
        editVisible: false,
        newKey: this.state.newKey + 1
      });

    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    // console.log(this.props.listsTitle);
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
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
      onSelection: this.onSelection,
    };

    let showVisible = null;
    if (this.state.showVisible) {
      showVisible = <ShowModel
                      visible={this.state.showVisible}
                      onCancel={this.handleShowCancel}
                      columns={this.props.columns}
                      title={this.props.showTitle}
                      url={Global.getUrl()}
                      dataSource={this.state.showData}
                      updateList={this.updateList}
                    />
    }

    let editVisible = null;
    if (this.state.editVisible) {
      editVisible = <EditModel
                      visible={this.state.editVisible}
                      onCancel={this.handleEditCancel}
                      onCreate={this.handleEditCreate}
                      columns={this.props.columns}
                      // key={this.props.dataId}
                      // dataId={this.props.dataId}
                      ref={this.saveFormRef}
                      title={this.props.editTitle}
                      url={Global.getUrl()}
                      model={this.props.model}
                      modelUrl={this.props.modelUrl}
                      dataSource={this.state.editData}
                      updateList={this.updateList}
                    />
    }

    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0 12px 16px' }}>
          <Breadcrumb.Item>主页</Breadcrumb.Item>
          <Breadcrumb.Item>{this.props.listsTitle}</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, background: '#fff' }}>
            <div>
              <AddModel
                columns={this.props.columns}
                title={this.props.addTitle}
                url={Global.getUrl()}
                model={this.props.model}
                modelUrl={this.props.modelUrl}
                updateList={this.updateList}
                addTips={this.props.addTips}
              />
              { showVisible }
              { editVisible }
              <div className='clearfix filter-box'>
                { this.state.filterTpl  }
                {
                  this.state.filterTpl && this.state.filterTpl.length > 0 &&
                  <Button icon="search" onClick={this.filterHandleClick} style={{ marginRight: 5 }}>筛选</Button>
                }
                {
                  this.state.filterTpl && this.state.filterTpl.length > 0 &&
                  <Button icon="reload" onClick={this.filterHandleReload}>重置</Button>
                }
              </div>
              <Table 
                rowSelection={rowSelection}
                columns={this.state.columns}
                dataSource={this.state.data}
                scroll={{ x: this.props.tableWidth[this.props.model]?this.props.tableWidth[this.props.model]:0 }}
                pagination={
                  {
                    onChange: this.onPageChange,
                    defaultPageSize: this.state.limit_page,
                    pageSize: this.state.limit_page,
                    total: this.state.total_page * this.state.limit_page,
                    current: this.state.page
                  }
                }
              />
            </div>
          </div>
        </Content>
      </div>
    );
  }
}

// export class List;
export default List;
