import React, { Component } from 'react';
// import FilterInput from './FilterInput';
import { Input, DatePicker } from 'antd';
import SelectBox from './SelectBox';
import Global from '../Global';
// import Config from '../Modules/Config';
import $ from 'jquery';

// const Option = Select.Option;
// const RadioGroup = Radio.Group;
// const CheckboxGroup = Checkbox.Group;

class WorkflowStateColumnTpl extends Component {

  constructor(props) {
    super(props);

    this.state={
      dataValue: null,
      workflowLinkageDataKey: "", // 筛选模式下的联查字段值
      dateValue: "", // 日期值
    };

    this.workflowHandleChange = this.workflowHandleChange.bind(this);
    this.workflowInputHandleChange = this.workflowInputHandleChange.bind(this);

    // this.workflowHandleSelectChange = this.workflowHandleSelectChange.bind(this);
    // this.workflowInputHandleSelectChange = this.workflowInputHandleSelectChange.bind(this);
  }

  componentDidMount() {
    // key:筛选参数名 type:筛选类型 k: react unique key placeHolder: placeholder文字 onChange: 修改事件 value: 筛选值
    // title: 字段标题
    let key = this.props.columnKey;
    let type = this.props.type;
    // let k = this.props.key;
    let placeHolder = this.props.placeHolder;
    let onChange = this.props.onChange;
    let value = this.props.value;
    let title = this.props.title;

    let dataValue = null;

    switch(type){

      case "text":
        // console.log(val);

        dataValue = <div className="workflow-item workflow-item-text">
                      <label>{title}</label>
                      <Input placeholder={placeHolder} data-workflow={key} onChange={onChange} defaultValue={value} />
                    </div>;

        break;
      case "date":
        // console.log(val);

        dataValue = <div className="workflow-item workflow-item-date">
                      <label>{title}</label>
                      <DatePicker 
                        data-workflow={key} 
                        onChange={ this.workflowHandleChange } 
                        placeholder={placeHolder} 
                      />
                      <input
                        type="hidden"
                        ref={(input)=> this.dateinput = input}
                        data-workflow={key}
                        value={this.state.dateValue}
                        onChange={ this.workflowInputHandleChange }
                      />
                    </div>;

        break;
      case "datetime":

        dataValue = <div className="workflow-item workflow-item-datetime">
                      <label>{title}</label>
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder={placeHolder}
                        onChange={ this.workflowHandleChange }
                      />
                      <input
                        type="hidden"
                        ref={(input)=> this.dateinput = input}
                        data-workflow={key}
                        value={this.state.dateValue}
                        onChange={ this.workflowInputHandleChange }
                      />
                    </div>

        break;
      case "select":

        dataValue = this.inputSelectTpl(key, placeHolder, onChange, value, title, false);

        break;
      default:
        dataValue = dataValue + "";

    }

    this.setState({
      dataValue: dataValue
    });
  }

  inputSelectTpl = (key, placeHolder, onChange, value, title, isShowInput) => {
    let SelectTpl = Global.columnsDataSource(key);
    this.setState({workflowLinkageDataKey: SelectTpl.modelDataFilterKey});

    if (SelectTpl.isLocal) {

      return (<div className="workflow-item workflow-item-select">
                <label>{title}</label>
                <SelectBox 
                  modelJson={SelectTpl.modelJson} 
                  modelDataKey={SelectTpl.modelDataKey} 
                  modelDataValue={SelectTpl.modelDataValue} 
                  placeholder={SelectTpl.modelDataPlaceholder}
                  filterText={SelectTpl.modelDataFilterText}
                  isWorkflow={ true }
                  isLocal={ SelectTpl.isLocal }
                  onChange={ this.workflowHandleSelectChange }
                  modelDataLinkage={SelectTpl.modelDataLinkage}
                  modelDataColumn={SelectTpl.modelDataColumn}
                  modelDataParams={SelectTpl.modelDataParams}
                  width={SelectTpl.width}
                />
                {
                  SelectTpl.isInputSelect && isShowInput &&
                  <label>{'\u00A0'}</label>
                }
                { SelectTpl.isInputSelect && isShowInput &&
                  <Input  
                    placeholder={placeHolder}
                    data-workflow={key}
                    onChange={onChange}
                    style={{width: SelectTpl.width, marginTop: "10px"}}
                    defaultValue={value} />
                }
                <input
                  type="hidden"
                  ref={(input)=> this.dateinput = input}
                  data-workflow={key}
                  value={this.state.dateValue}
                  onChange={ this.workflowInputHandleSelectChange }
                />
              </div>);
    }else{

      return (<div className="workflow-item workflow-item-select">
                <label>{title}</label>
                <SelectBox
                  modelUrl={SelectTpl.modelUrl} 
                  modelDataKey={SelectTpl.modelDataKey} 
                  modelDataValue={SelectTpl.modelDataValue} 
                  placeholder={SelectTpl.modelDataPlaceholder}
                  filterText={SelectTpl.modelDataFilterText}
                  isWorkflow={ true }
                  onChange={ this.workflowHandleSelectChange }
                  modelDataLinkage={SelectTpl.modelDataLinkage}
                  modelDataColumn={SelectTpl.modelDataColumn}
                  modelDataParams={SelectTpl.modelDataParams}
                  width={SelectTpl.width}
                />
                <input
                  type="hidden"
                  ref={(input)=> this.dateinput = input}
                  data-workflow={key}
                  value={this.state.dateValue}
                  onChange={ this.workflowInputHandleSelectChange }
                />
              </div>);
    }
  }


  workflowHandleChange = (e, dataString) => {

    this.setState({
      dateValue: dataString
    });

    var event = new Event('input', { bubbles: true });
    this.dateinput.dispatchEvent(event);

    this.workflowInputHandleChange(event, dataString);

  }

  // datepicker on change function
  workflowInputHandleChange = (e, dataString) => {
    console.log(e.target.value);
    this.props.onChange(e, dataString);
  }

  workflowHandleSelectChange = (dataString) => {
    // console.log(this.state.workflowLinkageDataKey);
    // console.log(dataString);
    let obj = {};

    if (this.state.workflowLinkageDataKey!== undefined) {
      $.each(this.state.workflowLinkageDataKey, function(index, val) {
        obj[val] = dataString.split(",")[index];
      });
    }else{
      obj = dataString
    }

    this.setState({
      dateValue: obj
    });

    if (dataString.toString() === "") {

      let dataValue = this.inputSelectTpl(
                        this.props.columnKey, 
                        this.props.placeHolder, 
                        this.props.onChange, 
                        this.props.value, 
                        this.props.title, 
                        true);
      this.setState({
        dataValue: dataValue,
      });

    }else{

      let dataValue = this.inputSelectTpl(
                        this.props.columnKey, 
                        this.props.placeHolder, 
                        this.props.onChange, 
                        this.props.value, 
                        this.props.title, 
                        false);
      this.setState({
        dataValue: dataValue,
      });

    }

    // console.log(dataString);

    var event = new Event('input', { bubbles: true });
    this.dateinput.dispatchEvent(event);

    this.workflowInputHandleSelectChange(event, obj);

  }

  // select on change function
  workflowInputHandleSelectChange = (e, dataString) => {
    // console.log(e.target.value);
    // console.log(dataString);
    this.props.onChange(e, dataString);
  }

  render() {
    return (
      this.state.dataValue
    );
  }
}

export default WorkflowStateColumnTpl;