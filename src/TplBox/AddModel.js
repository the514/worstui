import React, { Component } from 'react';
import Global from '../Global';
import Config from '../Modules/Config';
import GetColumnTpl from './GetColumnTpl';
import { Modal, Button, Form } from 'antd';
import axios from 'axios';
import $ from 'jquery';

const FormItem = Form.Item;

const CollectionCreateForm = Form.create({
  // onValuesChange: (props, values) => {
  //   console.log(props);
  //   console.log(values);
  //   $.each(values, function(k, v) {
  //     $.each(values[k], function(key, val) {
  //       console.log(key);
  //       Global.linkageChangeData(key);
  //     });
  //   });
  // }
})(
  (props) => {

    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 18 },
    };

    var formItems = [];
    $.each(props.formItemList, function(index, val) {
      if(props.columns[index].addHidden !== true){  // 是否在添加表单显示

        let rulesObj = {}; // 配置字段验证
        let initObj = {}; // 配置字段默认设置

        if(props.columns[index].dataType!==undefined){

          rulesObj =  {
            type: props.columns[index].dataType,
            required: props.columns[index].required?true:false, 
            message: props.columns[index].message?props.columns[index].message:""
          };

          initObj.rules = [rulesObj];

        }else{

          rulesObj = {
            required: props.columns[index].required?true:false, 
            message: props.columns[index].message?props.columns[index].message:"" 
          };

          initObj.rules = [rulesObj]; // 合并配置字段验证初始化设置

        }
        
        if (props.columns[index].initialValue!==undefined) {
          initObj.initialValue = props.columns[index].initialValue;
        }else{
          initObj.initialValue = null;
        }

        if (props.columns[index].valuePropName!==undefined) {
          initObj.valuePropName = props.columns[index].valuePropName;
        }

        if (props.columns[index].getValueFromEvent!==undefined) {
          initObj.getValueFromEvent = props.normFile;
        }

        formItems.push(
          <FormItem
            {...formItemLayout}
            label={props.columns[index].title} 
            key={index}
          >

            {getFieldDecorator(props.formItemName[index], initObj)(
              val
            )}
          </FormItem>);
      }

    });

    return (
      <Modal
        key={props.newKey}
        visible={visible}
        title={props.title}
        width={props.width}
        style={{height: "90%", overflow: "hidden", top: "40px"}}
        okText="添加"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          { formItems }
        </Form>
      </Modal>
    );
  }
);

// 添加新数据模态框
class AddModel extends Component {
  state = { 
    visible: false,
    model: [],
    modelName: [],
    newKey: 1
  }
  componentDidMount(props) {
    let dataValue = {};
    let dataTpl = [];
    let model = this.props.model;
    let modelName = "";
    let modelNameArr = [];

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
        dataValue[modelName] = v.initialValue;    // 设置字段默认值
      }
      dataValue[modelName] = GetColumnTpl(
                            v.key,                // 字段名称
                            modelName,            // 模型名称
                            dataValue[modelName], // 默认值
                            "add",                // 样式类型 [add, show, edit]
                            projectUrl,           // 项目地址
                            "",                   // 数据id
                            undefined,            // updateList 回调函数
                            undefined,            // 分类解释数据字段名
                            v.isLocal             // 是否是本地解释数据
                            );          
      dataTpl.push(dataValue[modelName]);
    });

    this.setState({model: dataTpl});
    this.setState({modelName: modelNameArr});
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleCancel = () => this.setState({ 
    visible: false,
    newKey: this.state.newKey===1?0:1
  })

  handleCreate = (e) => {
    const form = this.form;
    
    form.validateFields((err, fieldsValue) => {
      if (err) {
        console.log(fieldsValue);
        return;
      }

      if ( Config.jsonRequestType() === "object" ){
        $.each(fieldsValue, function(k, v) {

          let regExp = /(_){1}[^_]+$/;
          let textIndex = k.search(regExp);
          switch(textIndex>-1?k.slice(textIndex):0){
            case "_tag":
              $.each(fieldsValue[k], function(tagIndex, tagVal) {
                tagIndex===0?fieldsValue[k] = tagVal:fieldsValue[k] += ","+tagVal;
              });
              break;
            case "_datetime":
              fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
              break;
            case "_at":
              fieldsValue[k] = fieldsValue[k].format('YYYY-MM-DD HH:mm:ss');
              break;
            case "_date":
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
                case "_tag":
                  $.each(fieldsValue[index][k], function(tagIndex, tagVal) {
                    tagIndex===0?fieldsValue[index][k] = tagVal:fieldsValue[index][k] += ","+tagVal;
                  });
                  break;
                case "_datetime":
                  if (fieldsValue[index][k]===null) {
                    fieldsValue[index][k] = "";
                  }else{
                    fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  }
                  break;
                case "_at":
                  if (fieldsValue[index][k]===null) {
                    fieldsValue[index][k] = "";
                  }else{
                    fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD HH:mm:ss');
                  }
                  break;
                case "_date":
                  if (fieldsValue[index][k]===null) {
                    fieldsValue[index][k] = "";
                  }else{
                    fieldsValue[index][k] = fieldsValue[index][k].format('YYYY-MM-DD');
                  }
                  break;
                default:
              }

           });
        });
      }

      console.log('Received values of form: ', fieldsValue);

      Global.LoadingStart();

      const config = Global.getHeader();

      const params = fieldsValue;

      axios.post(this.props.url + this.props.modelUrl, params, config)
        .then(response => {
          if (response.headers["access-token"]) {
            Global.setTokenHeader(response);
          }
          console.log(response.headers);

          Global.openNotification({type:"success", title:"操作成功", body:this.props.addTips});
          this.props.updateList();
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
        visible: false,
        newKey: this.state.newKey + 1
      });

    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  render() {
    return (
      <div>
        <Button className="add-button-top" type="primary" icon="plus" onClick={this.showModal}>
          添加
        </Button>

        <CollectionCreateForm
          newKey={this.state.newKey}
          ref={this.saveFormRef}
          width={1200}
          title={this.props.title}
          columns={this.props.columns}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          formItemList={this.state.model}
          formItemName={this.state.modelName}
        />
      </div>
    );
  }
}

export default AddModel;