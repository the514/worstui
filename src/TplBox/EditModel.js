import React, { Component } from 'react';
import GetColumnTpl from './GetColumnTpl';
import Config from '../Modules/Config';
// import GetColumnConfig from './GetColumnConfig'; // 字段配置
import { Modal, Form } from 'antd';
import moment from 'moment';
import $ from 'jquery';

const FormItem = Form.Item;

// 添加新数据模态框
class EditModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: [],
      modelName: [],
      newKey: props.key,
      data: {},
      visible: false,
      formItems: []
    };
  }

  componentDidMount(props) {
    let dataValue = {};
    let dataTpl = [];
    let model = this.props.model;
    let modelId = this.props.dataSource.id;
    let updateList = this.props.updateList;
    let modelName = "";
    let modelNameArr = [];

    // let columns = [];

    // $.each(this.props.columns, function(index, val) {
    //   $.each(this.props.columns[index], function(k, v) {

    //     columns.push(GetColumnConfig(k, v, columns[index], this));

    //   });
    // });
    // console.log(this.props.columns);

    let projectUrl = this.props.url;

    $.each(this.props.columns, function(i, v) {
      if ( Config.jsonRequestType() === "object" ){
        modelName = v.key; // 字段名为 key
      }else{
        modelName = model + "["+ v.key +"]"; // 字段名修改为 model[key]
      }
      modelNameArr.push(modelName);        // 字段名添加到数组

      dataValue[modelName] = "";
      if (v.initialValue) {
        dataValue[modelName] = v.initialValue;
      }
      dataValue[modelName] = GetColumnTpl(
                            v.key,                  // 字段名称
                            modelName,              // 模型名称
                            dataValue[modelName],   // 默认值
                            "edit",                 // 样式类型 [add, show, edit]
                            projectUrl,             // 项目地址
                            modelId,                // 数据id
                            updateList,             // 更新list
                            undefined,              // 分类解释数据字段名
                            v.isLocal);             // 是否是本地解释数据
      dataTpl.push(dataValue[modelName]);
    });

    this.setState({model: dataTpl});
    this.setState({modelName: modelNameArr});

  }

  componentWillReceiveProps(nextProps) {

    this.setState({ visible: nextProps.visible });

    // let thisClass = this;
    // let thisNextProps = nextProps;

    // setTimeout((thisClass, thisNextProps) => {

    const { getFieldDecorator } = nextProps.form;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };

    var formItems = [];
    var formItemName = this.state.modelName;
    $.each(this.state.model, function(index, val) {
      if(nextProps.columns[index].editHidden !== true){  // 是否在编辑表单显示

        let rulesObj = {}; // 配置字段验证
        let initObj = {}; // 配置字段默认设置

        if(nextProps.columns[index].dataType!==undefined){

          rulesObj =  {
            type: nextProps.columns[index].dataType,
            required: nextProps.columns[index].required?true:false, 
            message: nextProps.columns[index].message?nextProps.columns[index].message:""
          };

          initObj.rules = [rulesObj];

        }else{

          rulesObj = {
            required: nextProps.columns[index].required?true:false, 
            message: nextProps.columns[index].message?nextProps.columns[index].message:"" 
          };

          initObj.rules = [rulesObj]; // 合并配置字段验证初始化设置

        }

        let columnsKey = nextProps.columns[index].key;  // 获取字段key
        let columnsValue = "";                      // 获取字段val
        if (nextProps.dataSource!==undefined && nextProps.dataSource!==null) {  
          columnsValue = nextProps.dataSource[columnsKey];

          let regExp = /(_){1}[^_]+$/;
          let textIndex = columnsKey.search(regExp);
          switch(textIndex>-1?columnsKey.slice(textIndex):0){
            case "_tag":      // 标签类型字段需要重新用逗号分隔
              columnsValue = columnsValue + "";
              // console.log(columnsValue);
              break;
            case "_datetime": // 日期moment类型需要重新转换成日期字符串
              if (columnsValue===null) {
                columnsValue = "";
              }else{
                columnsValue = moment(columnsValue, 'YYYY-MM-DD HH:mm:ss');
              }
              break;
            case "_at":       // 日期moment类型需要重新转换成日期字符串
              if (columnsValue===null) {
                columnsValue = "";
              }else{
                columnsValue = moment(columnsValue, 'YYYY-MM-DD HH:mm:ss');
              }
              break;
            case "_date":     // 日期moment类型需要重新转换成日期字符串
              if (columnsValue===null) {
                columnsValue = "";
              }else{
                columnsValue = moment(columnsValue, 'YYYY-MM-DD');
              }
              break;
            default:
          }

          initObj.initialValue = columnsValue;
          // console.log(initObj);

        }

        if (nextProps.columns[index].valuePropName!==undefined) {
          initObj.valuePropName = nextProps.columns[index].valuePropName;
        }

        if (nextProps.columns[index].getValueFromEvent!==undefined) {
          initObj.getValueFromEvent = nextProps.normFile;
        }

        formItems.push(
          <FormItem
            {...formItemLayout}
            label={nextProps.columns[index].title} 
            key={index}
          >
            {getFieldDecorator(formItemName[index], initObj)(
              val
            )}
          </FormItem>);
      }

    });
    // console.log(formItems);

    this.setState({ formItems: formItems });
    // }, 200);

  }

  render() {

    return (

      <Modal
        className="editModel"
        key={this.state.newKey}
        visible={this.props.visible}
        title={this.props.title}
        width={1200}
        style={{height: "90%", overflow: "hidden", top: "40px"}}
        okText="保存"
        onCancel={this.props.onCancel}
        onOk={this.props.onCreate}
      >
        <Form>
          { this.state.formItems }
        </Form>
      </Modal>
    );
  }
}

EditModel = Form.create({})(EditModel);

export default EditModel;