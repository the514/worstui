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

class GetFilterTpl extends Component {

  constructor(props) {
    super(props);

    this.state={
      dataValue: null,
      filterLinkageDataKey: "", // 筛选模式下的联查字段值
      dateValue: "" // 日期值
    };

    this.filterHandleChange = this.filterHandleChange.bind(this);
    this.filterInputHandleChange = this.filterInputHandleChange.bind(this);
  }

  componentDidMount() {
    // key:筛选参数名 type:筛选类型 k: react unique key pHolder: placeholder文字 onChange: 修改事件 val: 筛选值
    let key = this.props.filterKey;
    let type = this.props.type;
    // let k = this.props.key;
    let pHolder = this.props.pHolder;
    let onChange = this.props.onChange;
    let val = this.props.val;
    let isLocal = this.props.isLocal;

    let dataValue = null;

    switch(type){

      case "text":
        // console.log(val);

        dataValue = <div className="filter-item filter-item-text">
                      <Input placeholder={pHolder} data-filter={key} onChange={onChange} defaultValue={val[key]} />
                    </div>;

        break;
      case "date":
        // console.log(val);

        dataValue = <div className="filter-item filter-item-date">
                      <DatePicker 
                        data-filter={key} 
                        onChange={ this.filterHandleChange } 
                        placeholder={pHolder} 
                      />
                      <input
                        type="hidden"
                        ref={(input)=> this.dateinput = input}
                        data-filter={key}
                        value={this.state.dateValue}
                        onChange={ this.filterInputHandleChange }
                      />
                    </div>;

        break;
      case "datetime":

        dataValue = <div className="filter-item filter-item-datetime">
                      <DatePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder={pHolder}
                        onChange={ this.filterHandleChange }
                      />
                      <input
                        type="hidden"
                        ref={(input)=> this.dateinput = input}
                        data-filter={key}
                        value={this.state.dateValue}
                        onChange={ this.filterInputHandleChange }
                      />
                    </div>

        break;
      case "select":

        let SelectTpl = Global.columnsDataSource(key);
        this.setState({filterLinkageDataKey: SelectTpl.modelDataFilterKey});

        if (isLocal) {
          dataValue = <div className="filter-item filter-item-select">
                        <SelectBox 
                          modelJson={SelectTpl.modelJson} 
                          modelDataKey={SelectTpl.modelDataKey} 
                          modelDataValue={SelectTpl.modelDataValue} 
                          placeholder={SelectTpl.modelDataPlaceholder}
                          filterText={SelectTpl.modelDataFilterText}
                          isFilter={ true }
                          isLocal={ isLocal }
                          onChange={ this.filterHandleSelectChange }
                          modelDataLinkage={SelectTpl.modelDataLinkage}
                          modelDataColumn={SelectTpl.modelDataColumn}
                          modelDataParams={SelectTpl.modelDataParams}
                        />
                        <input
                          type="hidden"
                          ref={(input)=> this.dateinput = input}
                          data-filter={key}
                          value={this.state.dateValue}
                          onChange={ this.filterInputHandleSelectChange }
                        />
                      </div>;
        }else{

          dataValue = <div className="filter-item filter-item-select">
                        <SelectBox
                          modelUrl={SelectTpl.modelUrl} 
                          modelDataKey={SelectTpl.modelDataKey} 
                          modelDataValue={SelectTpl.modelDataValue} 
                          placeholder={SelectTpl.modelDataPlaceholder}
                          filterText={SelectTpl.modelDataFilterText}
                          isFilter={ true }
                          onChange={ this.filterHandleSelectChange }
                          modelDataLinkage={SelectTpl.modelDataLinkage}
                          modelDataColumn={SelectTpl.modelDataColumn}
                          modelDataParams={SelectTpl.modelDataParams}
                        />
                        <input
                          type="hidden"
                          ref={(input)=> this.dateinput = input}
                          data-filter={key}
                          value={this.state.dateValue}
                          onChange={ this.filterInputHandleSelectChange }
                        />
                      </div>;
        }


        break;
      default:
        dataValue = dataValue + "";

    }

    this.setState({
      dataValue: dataValue
    });
  }

  filterHandleChange = (e, dataString) => {

    this.setState({
      dateValue: dataString
    });

    var event = new Event('input', { bubbles: true });
    this.dateinput.dispatchEvent(event);

    this.filterInputHandleChange(event, dataString);

  }

  // datepicker on change function
  filterInputHandleChange = (e, dataString) => {
    console.log(e.target.value);
    this.props.onChange(e, dataString);
  }

  filterHandleSelectChange = (dataString) => {
    console.log(this.state.filterLinkageDataKey);
    let obj = {};
    $.each(this.state.filterLinkageDataKey, function(index, val) {
      obj[val] = dataString.split(",")[index];
    });

    this.setState({
      dateValue: obj
    });

    var event = new Event('input', { bubbles: true });
    this.dateinput.dispatchEvent(event);

    this.filterInputHandleChange(event, obj);

  }

  // select on change function
  filterInputHandleSelectChange = (e, dataString) => {
    console.log(e.target.value);
    this.props.onChange(e, dataString);
  }

  render() {
    return (
      this.state.dataValue
    );
  }
}

export default GetFilterTpl;