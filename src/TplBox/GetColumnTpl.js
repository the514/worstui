import React from 'react';
import ImgModal from './ImgModal';
import EditTag from './EditTag';
import FormatDate from './FormatDate';
import ImgUpload from './ImgUpload';
import SelectBox from './SelectBox';
import CkBox from './CkBox';
import CkeditorImg from './CkeditorImg';
import WorkflowState from './WorkflowState';
import ImgSynchroUpload from './ImgSynchroUpload';
import { Tag, Input, Radio, InputNumber, Checkbox, DatePicker } from 'antd';
import Global from '../Global';
// import Config from '../Modules/Config';
import $ from 'jquery';

// const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
// const CheckboxGroup = Checkbox.Group;

// 字段样式
const GetColumnTpl = function(k, v, dataValue, type, url, dataId, updateList, otherVal, isLocal){ 
  // k:字段名 v:字段值 dataValue:字段值 type:字段类型 url:项目地址 
  // dataId: data id updateList:更新list回调 otherVal: 分类解释数据字段名 isLocal: selectbox 是否是本地解释数据

  let regExp = /(_){1}[^_]+$/;
  let textIndex = k.search(regExp);

  switch(textIndex>-1?k.slice(textIndex):k){

    case "_tag":
      if (type==="add") {
        dataValue = <EditTag />;
      }else if (type==="edit") {
        dataValue = <EditTag />;
      }else{
        dataValue = [];
        if (v.length > 0) {
          $.each(v.split(","), function(tagIndex, tagVal) {
            dataValue.push(<Tag color="#2db7f5" key={tagIndex} style={{marginBottom: "5px"}}>{tagVal}</Tag>);
          });
        }
      }
      break;
    case "_img":
      if (type==="add") {
        dataValue = <ImgUpload url={url} />;
      }else if (type==="edit") {
        dataValue = <ImgUpload url={url} />;
      }else if (type==="show") {
        dataValue = <ImgModal imgSrc={dataValue} height="150" />;
      }else{
        dataValue = <div style={{height: "150px"}}><img src={dataValue} height="150" alt="" /></div>;
      }
      break;
    case "_boolean":
      if (type==="add") {
        dataValue = <Checkbox onChange={(value) => value}></Checkbox>;
      }else if (type==="edit") {
        dataValue = <Checkbox onChange={(value) => value}></Checkbox>;
      }else{
        dataValue = dataValue?"是":"否";
      }
      break;
    case "_checkbox":
      if (type==="add") {
        dataValue = <Checkbox></Checkbox>;
      }else if (type==="edit") {
        dataValue = <Checkbox></Checkbox>;
      }else{
        dataValue = dataValue?"是":"否";
      }
      break;
    case "_price":
      if (type==="add") {
        dataValue = <InputNumber min={1} />;
      }else if (type==="edit") {
        dataValue = <InputNumber min={1} />;
      }else{
        dataValue = "¥" + dataValue;
      }
      break;
    case "_number":
      if (type==="add") {
        dataValue = <InputNumber />;
      }else if (type==="edit") {
        dataValue = <InputNumber />;
      }
      break;
    case "_int":
      if (type==="add") {
        dataValue = <InputNumber min={0} />;
      }else if (type==="edit") {
        dataValue = <InputNumber min={0} />;
      }
      break;
    case "_float":
      if (type==="add") {
        dataValue = <InputNumber step={0.1} />;
      }else if (type==="edit") {
        dataValue = <InputNumber step={0.1} />;
      }
      break;
    case "_select":
      if (isLocal) {
        let SelectTpl = Global.columnsDataSource(k);
        if (type==="add") {
          dataValue = <SelectBox 
                        modelJson={SelectTpl.modelJson} 
                        modelDataKey={SelectTpl.modelDataKey} 
                        modelDataValue={SelectTpl.modelDataValue} 
                        placeholder={SelectTpl.modelDataPlaceholder}
                        modelDataLinkage={SelectTpl.modelDataLinkage}
                        modelDataColumn={SelectTpl.modelDataColumn}
                        modelDataParams={SelectTpl.modelDataParams}
                      />;
        }else if (type==="edit") {
          dataValue = <SelectBox 
                        modelJson={SelectTpl.modelJson} 
                        modelDataKey={SelectTpl.modelDataKey} 
                        modelDataValue={SelectTpl.modelDataValue} 
                        placeholder={SelectTpl.modelDataPlaceholder}
                        modelDataLinkage={SelectTpl.modelDataLinkage}
                        modelDataColumn={SelectTpl.modelDataColumn}
                        modelDataParams={SelectTpl.modelDataParams}
                      />;
        }else{
          $.each(SelectTpl.modelJson.list, function(index, val) {
            if (SelectTpl.modelJson.list[index][SelectTpl.modelDataValue] === dataValue) {
              dataValue = SelectTpl.modelJson.list[index][SelectTpl.modelDataKey];
            }
          });
        }
      }else {
        let SelectTpl = Global.columnsDataSource(k);
        if (type==="add") {
          dataValue = <SelectBox 
                        modelUrl={SelectTpl.modelUrl} 
                        modelDataKey={SelectTpl.modelDataKey} 
                        modelDataValue={SelectTpl.modelDataValue} 
                        placeholder={SelectTpl.modelDataPlaceholder}
                        modelDataLinkage={SelectTpl.modelDataLinkage}
                        modelDataColumn={SelectTpl.modelDataColumn}
                        modelDataParams={SelectTpl.modelDataParams}
                      />;
        }else if (type==="edit") {
          dataValue = <SelectBox 
                        modelUrl={SelectTpl.modelUrl} 
                        modelDataKey={SelectTpl.modelDataKey} 
                        modelDataValue={SelectTpl.modelDataValue} 
                        placeholder={SelectTpl.modelDataPlaceholder}
                        modelDataLinkage={SelectTpl.modelDataLinkage}
                        modelDataColumn={SelectTpl.modelDataColumn}
                        modelDataParams={SelectTpl.modelDataParams}
                      />;
        }else{
          dataValue = otherVal;
          // console.log(otherVal);
        }
      }

      break;
    case "_id":
      if (isLocal) {
        let idSelectTpl = Global.columnsDataSource(k);
        if (type==="add") {
          dataValue = <SelectBox 
                        modelJson={idSelectTpl.modelJson} 
                        modelDataKey={idSelectTpl.modelDataKey} 
                        modelDataValue={idSelectTpl.modelDataValue} 
                        placeholder={idSelectTpl.modelDataPlaceholder}
                        modelDataLinkage={idSelectTpl.modelDataLinkage}
                        modelDataColumn={idSelectTpl.modelDataColumn}
                        modelDataParams={idSelectTpl.modelDataParams}
                      />;
        }else if (type==="edit") {
          dataValue = <SelectBox 
                        modelJson={idSelectTpl.modelJson} 
                        modelDataKey={idSelectTpl.modelDataKey} 
                        modelDataValue={idSelectTpl.modelDataValue} 
                        placeholder={idSelectTpl.modelDataPlaceholder}
                        modelDataLinkage={idSelectTpl.modelDataLinkage}
                        modelDataColumn={idSelectTpl.modelDataColumn}
                        modelDataParams={idSelectTpl.modelDataParams}
                      />;
        }else{
          $.each(idSelectTpl.modelJson.list, function(index, val) {
            if (idSelectTpl.modelJson.list[index][idSelectTpl.modelDataValue] === dataValue) {
              dataValue = idSelectTpl.modelJson.list[index][idSelectTpl.modelDataKey];
            }
          });
          // console.log(otherVal);
        }
      }else {
        let idSelectTpl = Global.columnsDataSource(k);
        if (type==="add") {
          dataValue = <SelectBox 
                        modelUrl={idSelectTpl.modelUrl} 
                        modelDataKey={idSelectTpl.modelDataKey} 
                        modelDataValue={idSelectTpl.modelDataValue} 
                        placeholder={idSelectTpl.modelDataPlaceholder}
                        modelDataLinkage={idSelectTpl.modelDataLinkage}
                        modelDataColumn={idSelectTpl.modelDataColumn}
                        modelDataParams={idSelectTpl.modelDataParams}
                      />;
        }else if (type==="edit") {
          dataValue = <SelectBox 
                        modelUrl={idSelectTpl.modelUrl} 
                        modelDataKey={idSelectTpl.modelDataKey} 
                        modelDataValue={idSelectTpl.modelDataValue} 
                        placeholder={idSelectTpl.modelDataPlaceholder}
                        modelDataLinkage={idSelectTpl.modelDataLinkage}
                        modelDataColumn={idSelectTpl.modelDataColumn}
                        modelDataParams={idSelectTpl.modelDataParams}
                      />;
        }else{
          dataValue = otherVal;
          // console.log(otherVal);
        }        
      }

      break;
    case "_url":
      if (type==="add") {
        dataValue = <Input />;
      }else if (type==="edit") {
        dataValue = <Input />;
      }else{
        dataValue = <a href={dataValue}>{dataValue}</a>;
      }
      break;
    case "_radio":
      if (type==="add") {
        dataValue = <RadioGroup>
                      <Radio value="true">是</Radio>
                      <Radio value="false">否</Radio>
                    </RadioGroup>;
      }else if (type==="edit") {
        dataValue = <RadioGroup>
                      <Radio value="true">是</Radio>
                      <Radio value="false">否</Radio>
                    </RadioGroup>;
      }
      break;
    case "_email":
      if (type==="add") {
        dataValue = <Input />;
      }else if (type==="edit") {
        dataValue = <Input />;
      }else{
        let emailLink = "mailto:" + dataValue;
        dataValue = <a href={emailLink}>{dataValue}</a>;
      }
      break;
    case "_text":
      if (type==="add") {
        dataValue = <Input />;
      }else if (type==="edit") {
        dataValue = <Input />;
      }
      break;
    case "password":
      if (type==="add") {
        dataValue = <Input type="password" />;
      }else if (type==="edit") {
        dataValue = <Input type="password" />;
      }
      break;
    case "_textarea":
      // console.log(1);
      if (type==="add") {
        dataValue = <TextArea autosize={{ minRows: 2, maxRows: 6 }} />;
      }else if(type==="show"){
        dataValue = dataValue?dataValue:"无";
      }else if (type==="edit") {
        dataValue = <TextArea autosize={{ minRows: 2, maxRows: 6 }} />;
      }else{
        dataValue = dataValue?dataValue.length>50?dataValue.substr(0,50) + "...":dataValue:"无";
      }
      break;
    case "_editor":
      if (type==="add") {
        dataValue = <CkBox />;
      }else if (type==="show") {
        dataValue = dataValue?dataValue:"无";
      }else if (type==="edit") {
        dataValue = <CkBox />;
      }else{
        dataValue = dataValue?dataValue.length>50?dataValue.substr(0,50) + "...":dataValue:"无";
      }
      break;
    case "_imgarr":
      if (type==="add") {
        dataValue = <CkeditorImg url={url} />;
      }else if (type==="show") {
        dataValue = dataValue?dataValue:"无";
      }else if (type==="edit") {
        dataValue = <CkeditorImg url={url} />;
      }else{
        dataValue = dataValue?dataValue:"无";
      }
      break;
    case "_manage":
      if (type==="add") {
        dataValue = <ImgSynchroUpload url={url} />;
      }else if (type==="edit") {
        dataValue = <ImgSynchroUpload url={url} />;
      }else if (type==="show") {
        dataValue = <ImgModal imgSrc={dataValue} height="150" />;
      }else{
        dataValue = <div style={{height: "150px"}}><img src={dataValue} height="150" alt="" /></div>;
      }
      break;
    case "_state":
      let workflow = Global.columnsDataSource(k);
      if (type==="add") {
        dataValue = dataValue + "";
      }else if (type==="show") {
        $.each(workflow.state, function(key, val) {
          if (key===dataValue) {
            dataValue = workflow.state[key].text;
          }
        });
      }else if (type==="edit") {
        dataValue = <WorkflowState stateObj={workflow} dataId={dataId} updateList={updateList} />;
      }else{
        dataValue = <WorkflowState actionValue={dataValue} stateObj={workflow} dataId={dataId} />;
      }
      break;
    case "_datetime":
      if (type==="add") {
        dataValue = <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择日期时间" 
                    />
      }else if (type==="edit") {
        dataValue = <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择日期时间" 
                    />
      }else{
        dataValue = FormatDate(dataValue, "datetime");
      }
      break;
    case "_date":
      if (type==="add") {
        dataValue = <DatePicker placeholder="选择日期" />;
      }else if (type==="edit") {
        dataValue = <DatePicker placeholder="选择日期" />;
      }else{
        dataValue = FormatDate(dataValue, "date");
      }
      break;
    case "_at":
      if (type==="add") {
        dataValue = <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择日期时间" />
      }else if (type==="edit") {
        dataValue = <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss"
                      placeholder="选择日期时间" />
      }else{
        dataValue = FormatDate(dataValue, "datetime");
      }
      break;
    default:
      dataValue = dataValue + "";

  }
  return dataValue;

}

export default GetColumnTpl;