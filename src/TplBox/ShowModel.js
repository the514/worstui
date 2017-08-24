import React, { Component } from 'react';
import GetColumnTpl from './GetColumnTpl';
import { Modal } from 'antd';
import $ from 'jquery';

// 查看数据模态框
class ShowModel extends Component {
  state = { 
    model: [],
    modelName: [],
    data: [],
  }
  componentDidMount(props) {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    let dataSource = this.props.dataSource;
    let modelId = this.props.dataSource.id;
    let columns = this.props.columns;
    let dataArr = [];
    let projectUrl = this.props.url;
    let updateList = this.props.updateList;

    let columnObj = {};
    $.each(columns, function(index, val) {
      $.each(columns[index], function(k, v) {
        if (k==="key" && columns[index].title !== undefined && columns[index].showHidden !== true) {
          columnObj[v] = {
            title: columns[index].title,
            key: columns[index][k],
            keyName: columns[index].keyName,
            isLocal: columns[index].isLocal
          }
        }
      });
    });

    // console.log(columnObj);
    // console.log(dataSource);

    if (dataSource !== null) {

      $.each(dataSource, function(k, v) {
        // console.log(dataSource);
        
        if(columnObj[k] !== undefined){

          // console.log(columnObj[k]["keyName"]);
          // console.log(dataSource[columnObj[k]["keyName"]]);
          // console.log(dataSource);
          dataArr.push({
            title: columnObj[k].title,
            key: columnObj[k].key,
            data: GetColumnTpl(
                  k,          // 字段名称
                  v,          // 模型名称
                  v,          // 默认值
                  "show",     // 样式类型 [add, show, edit]
                  projectUrl, // 项目地址
                  modelId,    // 数据id
                  updateList, // updataList 回调函数
                  dataSource[(columnObj[k]["keyName"]!==undefined?columnObj[k]["keyName"]:"")], // 分类解释数据字段名
                  columnObj[k].isLocal) // 是否是本地解释数据
          }); 

        }

        // console.log(columns);

      });
    }
    // $.each(columns, function(index, val) {
    //   $.each(columns[index], function(k, v) {
    //     console.log(columns[index].showHidden);
    //   });
    // });

    return (
      <div>
        <Modal
          className="showModel"
          visible={this.props.visible}
          title={this.props.title}
          width={1200}
          style={{height: "90%", overflow: "hidden", top: "40px"}}
          okText="关闭"
          onCancel={this.props.onCancel}
          footer={null}
        >
        <div className="showbd">
          { 
            dataArr &&
            dataArr.map((elem) =>
              <div key={elem.key}>
                <span>{elem.title}</span>
                <div className="bd">
                  {elem.data}
                </div>
              </div>
            )
          }
        </div>
        </Modal>
      </div>
    );
  }
}

export default ShowModel;