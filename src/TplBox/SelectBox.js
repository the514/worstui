import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Select } from 'antd';
import $ from 'jquery';
const Option = Select.Option;
class SelectBox extends Component {

  constructor(props) {
    super(props);
    const value = props.value || "";
    this.state = {
    	data: [],
      value: value,
    	options: [],
      selectLinkageValue: [], // 联查值
      selectLinkageOption: [], // 联查选项
      selectLinkageTpl: null // 联查模版
    };
  }

  componentDidMount(props) {
    const config = Global.getHeader();
    Global.LoadingStart();

    let modeUrl = this.props.modelUrl; // 请求地址
    let modelDataKey = this.props.modelDataKey; // 数据key
    let modelDataValue = this.props.modelDataValue; // 数据value名
    let modelDataColumn = this.props.modelDataColumn; // edit模式下显示数据字段名
    let modelDataParams = this.props.modelDataParams; // edit模式下选中对应项

    // 判断是否是联查select
    if (this.props.modelDataLinkage && modeUrl.length > 0) {
      let selectTplData = []; // select所需数据
      // let selectTpl = []; // select样式
      let options = []; // option选项
      let value = []; // 联查值

      let thisClass = this;

      // 如果有值 通常在edit模式下
      if (this.props.value) {

        // console.log(this.props.value);

        axios.get(Global.getUrl() + modeUrl[modeUrl.length - 1] + "?q[id_eq]=" + this.props.value, config)
          .then(response => {
            if (response.headers["access-token"]) {
              Global.setTokenHeader(response);
            }

            // console.log(response.data.list);

            selectTplData = response.data.list;
            if (selectTplData.length > 0) {

              $.each(modelDataColumn, function(index, val) {
                if (modelDataColumn.length - 1 === index) {
                  value.push(thisClass.state.value + "");
                }else{
                  value.push(selectTplData[0][modelDataColumn[index]] + "");
                }
              });

            }

            $.each(modeUrl, function(index, val) {

              options[index] = [];
              let params = "";
              // console.log(value[index]);
              if (modelDataParams[index]!=="") {
                if (index > 0 ) {
                  params = "?"+modelDataParams[index]+"=" + value[index - 1];
                }else{
                  params = "";
                }
              }else{
                params = "";
              }

              // console.log(index);
              // console.log(value[index]);
              // console.log(Global.getUrl() + modeUrl[index] + params);

              axios.get(Global.getUrl() + modeUrl[index] + params, config)
                .then(response => {
                  if (response.headers["access-token"]) {
                    Global.setTokenHeader(response);
                  }

                  // console.log(response.data.list);

                  selectTplData = response.data.list;

                  $.each(selectTplData, function(i, v) {
                    options[index].push(<Option linkKey={index} key={selectTplData[i][modelDataValue[index]]} value={selectTplData[i][modelDataValue[index]]+""}>{selectTplData[i][modelDataKey[index]]}</Option>);
                  });

                  thisClass.setState({selectLinkageOption: options});

                  thisClass.updateOption();

                  Global.LoadingEnd();
                })
                .catch(function (error) {
                  Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
                  console.log(error);
                  Global.getAuth(error);
                  Global.LoadingEnd();
                });
            });

            // console.log(value);

            thisClass.setState({
              selectLinkageValue: value
            });

            Global.LoadingEnd();
          })
          .catch(function (error) {
            Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
            console.log(error);
            Global.getAuth(error);
            Global.LoadingEnd();
          });

      // 如果无值 在add模式下或筛选模式
      }else{
        $.each(modeUrl, function(index, val) {
          
          options[index] = [];

          if (index>0) {

            options[index] = [];
            if (thisClass.props.isFilter) {
              options[index].push(<Option linkKey={index} key={-1} value="">{thisClass.props.filterText[index]}</Option>)
            }

            thisClass.setState({selectLinkageOption: options});

            thisClass.updateOption();

          }else{

            axios.get(Global.getUrl() + modeUrl[index], config)
              .then(response => {
                if (response.headers["access-token"]) {
                  Global.setTokenHeader(response);
                }

                // console.log(response.data.list);

                selectTplData = response.data.list;

                if (thisClass.props.isFilter) {
                  options[index].push(<Option linkKey={index} key={-1} value="">{thisClass.props.filterText[index]}</Option>)
                }

                $.each(selectTplData, function(i, v) {
                  options[index].push(<Option linkKey={index} key={selectTplData[i][modelDataValue[index]]} value={selectTplData[i][modelDataValue[index]]+""}>{selectTplData[i][modelDataKey[index]]}</Option>);
                });

                thisClass.setState({selectLinkageOption: options});

                thisClass.updateOption();

                Global.LoadingEnd();
              })
              .catch(function (error) {
                Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
                console.log(error);
                Global.getAuth(error);
                Global.LoadingEnd();
              });

          }

        });
      }
 
    // 如果不是联查select  
    }else{
      let options = [];
      // let selectTpl = [];
      // 异步请求才会刷新state 非异步需要手动更新state
      // console.log(this.props.modelJson);

      // 本地数据select
      if (this.props.modelJson) {
        this.setState({data: this.props.modelJson.list});
        // console.log(response.data.list);
        if(this.props.filterText){
          options.push(<Option key={-1} value="">{this.props.filterText}</Option>);
          this.props.modelJson.list.map(d => 
            options.push(<Option key={d[this.props.modelDataValue]} value={d[this.props.modelDataValue]+""}>{d[this.props.modelDataKey]}</Option>)
          );
        }else{
          this.props.modelJson.list.map(d => 
            options.push(<Option key={d[this.props.modelDataValue]} value={d[this.props.modelDataValue]+""}>{d[this.props.modelDataKey]}</Option>)
          );
        }

        this.setState({options: options});

        this.updateOneOption(undefined, options);

        Global.LoadingEnd();

      // 请求数据select
      }else {
        axios.get(Global.getUrl() + this.props.modelUrl, config)
          .then(response => {
            if (response.headers["access-token"]) {
              Global.setTokenHeader(response);
            }
            // console.log(response.data.list);
            this.setState({data: response.data.list});
            // console.log(response.data.list);
            if(this.props.filterText){
              options.push(<Option key={-1} value="">{this.props.filterText}</Option>);
              this.state.data.map(d => 
                options.push(<Option key={d[this.props.modelDataValue]} value={d[this.props.modelDataValue]+""}>{d[this.props.modelDataKey]}</Option>)
              );
            }else{
              this.state.data.map(d => 
                options.push(<Option key={d[this.props.modelDataValue]} value={d[this.props.modelDataValue]+""}>{d[this.props.modelDataKey]}</Option>)
              );
            }

            // console.log(this.props.value);
            // console.log(this.state.value);

            this.setState({options: options});

            this.updateOneOption();

            Global.LoadingEnd();
          })
          .catch(function (error) {
            Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
            console.log(error);
            Global.getAuth(error);
            Global.LoadingEnd();
          });
      }

    }

    // console.log(this.props.value);
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign(changedValue));
    }
  }

  handleChange = (value) => {
    console.log(value);
  	this.setState({ value: value });
    this.triggerChange(value);

    this.updateOneOption(value);
  }

  updateOption = (value, options) => {
    let thisClass = this;
    let selectTpl = [];

    $.each(this.state.selectLinkageOption, function(index, val) {

      // 无值
      if (value !== undefined) {
        selectTpl.push(<Select key={index} value={value+""} onSelect={thisClass.handleLinkageSelect} placeholder={thisClass.props.placeholder[index]}>
                      {thisClass.state.selectLinkageOption[index]}
                    </Select>);
      // 有值
      }else{
        // 如果是筛选模式
        if (thisClass.props.isFilter) {
          selectTpl.push(<Select style={{marginRight: (index===thisClass.state.selectLinkageOption.length-1?0:5)}} key={index} value={thisClass.state.selectLinkageValue[index]?thisClass.state.selectLinkageValue[index]:""} onSelect={thisClass.handleLinkageSelect} placeholder={thisClass.props.placeholder[index]}>
                        {thisClass.state.selectLinkageOption[index]}
                      </Select>);
        // 不是筛选模式
        }else {
          // console.log(this.state.options);
          selectTpl.push(<Select key={index} value={thisClass.state.selectLinkageValue[index]} onSelect={thisClass.handleLinkageSelect} placeholder={thisClass.props.placeholder[index]}>
                        {thisClass.state.selectLinkageOption[index]}
                      </Select>);
        }
      }

    });

    // console.log(selectTpl);

    this.setState({selectLinkageTpl: selectTpl});
  }

  updateOneOption = (value, options) => {
    let selectTpl = [];
    // console.log(value);
    // console.log(this.props.value);

    // 无值
    if (value !== undefined) {
      selectTpl.push(<Select key={1} value={value+""} onChange={this.handleChange} placeholder={this.props.placeholder}>
                    {this.state.options}
                  </Select>);
    // 有值
    }else{
      // 如果是筛选模式
      if (this.props.isFilter) {
        selectTpl.push(<Select key={1} value={""} onChange={this.handleChange} placeholder={this.props.placeholder}>
                      {this.state.options}
                    </Select>);
      // 不是筛选模式
      }else {
        // console.log(this.state.options);
        selectTpl.push(<Select key={1} value={this.props.value?this.state.value+"":undefined} onChange={this.handleChange} placeholder={this.props.placeholder}>
                      {options?options:this.state.options}
                    </Select>);
      }
    }

    this.setState({selectLinkageTpl: selectTpl});
  }

  handleLinkageChange = (e) => {
    console.log(e);
  }

  handleLinkageSelect = (v, o) => {
    const config = Global.getHeader();
    Global.LoadingStart();

    let thisClass = this;
    let modelUrl = this.props.modelUrl; // 请求地址
    let modelDataKey = this.props.modelDataKey; // 数据key
    let modelDataValue = this.props.modelDataValue;  // 数据value名
    let modelUrlLength = this.props.modelUrl.length; // select联动长度
    let modelDataParams = this.props.modelDataParams; // edit模式下选中对应项
    let selectTplData = [];

    let options = this.state.selectLinkageOption;
    
    if ((o.props.linkKey + 1) < modelUrlLength) { // 如果当前select的linkKey + 1 小于 配置联查接口长度

      let value = this.state.selectLinkageValue; 
      if (o.props.linkKey === 0) { // 如果当前select的linkKey === 0
        value = []; 
      }
      value[o.props.linkKey] = o.props.value; // 设置第1个select的值为 props.value
      value[o.props.linkKey + 1] = undefined; // 设置下一个select的值为 undefined
      if (thisClass.props.isFilter) {
        value[o.props.linkKey + 1] = ""; // 设置下一个select的值为 ""
      }
      // value[1] = o.props.value;
      this.setState({selectLinkageValue: value});

      let params = "";
      if (modelDataParams[o.props.linkKey + 1]!=="") { // 判断下一个select的配置项不为空
        params = "?"+modelDataParams[o.props.linkKey + 1]+"=" + o.props.value; // 进行联查
      }else{
        params = ""; // 什么也不做
      }

      axios.get(Global.getUrl() + modelUrl[o.props.linkKey + 1] + params, config) // 进行联查请求
        .then(response => {
          if (response.headers["access-token"]) {
            Global.setTokenHeader(response);
          }
          // console.log(response.data.list);

          selectTplData = response.data.list;

          options[o.props.linkKey + 1] = []; // 初始化下一个select为空值
          
          if (thisClass.props.isFilter) {
            options[o.props.linkKey + 1].push(<Option linkKey={o.props.linkKey + 1} key={-1} value={""}>{thisClass.props.filterText[o.props.linkKey + 1]}</Option>);
          }

          $.each(selectTplData, function(i, v) {
            options[o.props.linkKey + 1].push(<Option linkKey={o.props.linkKey + 1} key={selectTplData[i][modelDataValue[o.props.linkKey + 1]]} value={selectTplData[i][modelDataValue[o.props.linkKey + 1]]+""}>{selectTplData[i][modelDataKey[o.props.linkKey + 1]]}</Option>);
          });

          // 为下一个select装填option项

          // 如果后面有两个select存在 同样设置为空值
          if (o.props.linkKey + 2 <= modelUrlLength - 1) {
            options[o.props.linkKey + 2] = [];
            if (thisClass.props.isFilter) {
              options[o.props.linkKey + 2].push(<Option linkKey={o.props.linkKey + 2} key={-1} value={""}>{thisClass.props.filterText[o.props.linkKey + 2]}</Option>);
            }
          }

          // console.log(options);

          this.setState({
            selectLinkageOption: options
          });

          if (this.props.isFilter) {
            this.triggerChange(value.join(","));
          }

          this.updateOption();

          Global.LoadingEnd();
        })
        .catch(function (error) {
          Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
          console.log(error);
          Global.getAuth(error);
          Global.LoadingEnd();
        });
       
    }else if ((o.props.linkKey + 1) === modelUrlLength) { // 如果 下一个select 大于配置项的长度

      let value = this.state.selectLinkageValue; 
      value[o.props.linkKey] = o.props.value; // 只改变当前值
      // value[o.props.linkKey + 1] = undefined;
      // value[1] = o.props.value;
      this.setState({selectLinkageValue: value});
      this.setState({ value: o.props.value });
      if (this.props.isFilter) {
        this.triggerChange(value.join(","));
      }else {
        this.triggerChange(o.props.value);
      }

      this.setState({
        selectLinkageOption: options
      });

      this.updateOption();
      Global.LoadingEnd();
    }

    // console.log(this.state.selectLinkageOption);

  }

  render() {
    let selectTpl = null;

    selectTpl = this.state.selectLinkageTpl;

    return (
      <div>
        { 
          selectTpl
        }
      </div>  
    );
  }
}

export default SelectBox;
