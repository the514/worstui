import React from 'react';

import { Icon, Modal } from 'antd';
import Global from '../Global';
import axios from 'axios';
import $ from 'jquery';

const confirm = Modal.confirm;

// 字段样式
const GetColumnConfig = function(k, v, object, thisClass, isHiddenDeleteButton){ 
  // k:字段名, object 当前字段配置对象, thisClass List对象
  // isShowDeleteButton 是否显示删除按钮

  let regExp = /(_){1}[^_]+$/;
  let textIndex = k.search(regExp);
  let thisObject = object;
  let showDeleteButton = true;
  if (isHiddenDeleteButton) {
    showDeleteButton = false;
  }

  if (thisObject.message) {
    thisObject.required = true;
  }

  switch(textIndex>-1?k.slice(textIndex):k){

    case "_img":
      thisObject.valuePropName = 'fileList';
      thisObject.getValueFromEvent = true;
      break;
    case "_imgarr":
      thisObject.valuePropName = 'fileList';
      thisObject.getValueFromEvent = true;
      break;
    case "_checkbox":
      thisObject.valuePropName= "checked";
      thisObject.initialValue= false;
      break;
    case "_boolean":
      thisObject.valuePropName= "checked";
      thisObject.initialValue= false;
      break;
    case "_action":

      thisObject.render = (text, record) => (
                    <span>
                      <a data-button="show">
                        <Icon type="search" data-button="show" style={{paddingRight: "5px"}} /> 
                        查看
                      </a>
                      <span className="ant-divider" />
                      <a data-button="edit">
                        <Icon type="edit" data-button="edit" style={{paddingRight: "5px"}} /> 
                        编辑
                      </a>
                      {
                        showDeleteButton &&
                        <span className="ant-divider" />
                      }
                      {
                        showDeleteButton &&
                        <a data-button="delete">
                          <Icon type="delete" data-button="delete" style={{paddingRight: "5px"}} />
                          删除
                        </a>
                      }
                    </span>
                  );
      thisObject.onCellClick = (record, event) => {
        // console.log(record);
        // console.log(event);
        const config = Global.getHeader();

        if (event.target.getAttribute("data-button") === "show") {

          Global.LoadingStart();


          axios.get(Global.getUrl() + thisClass.props.modelUrl + "/" + record.id, config)
            .then(response => {

              if (response.headers["access-token"]) {
                Global.setTokenHeader(response);
              }
              // console.log(response.headers);
              // console.log(response);
              thisClass.setState({ showData: response.data });
              Global.LoadingEnd();
              
              thisClass.setState({ showVisible: true });
              thisClass.setState({ editVisible: false });

              setTimeout((function(){
                $(".showModel .ant-modal-content").scrollTop(0);
              }), 200);

              thisClass.setState({ dataId: response.data.id });
            })
            .catch(function (error) {
              Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
              console.log(error);
              Global.getAuth(error);
              Global.LoadingEnd();
            });
        }else if (event.target.getAttribute("data-button") === "edit") {

          Global.LoadingStart();

          axios.get(Global.getUrl() + thisClass.props.modelUrl + "/" + record.id, config)
            .then(response => {
              if (response.headers["access-token"]) {
                Global.setTokenHeader(response);
              }
              // console.log(response);
              thisClass.setState({ editData: response.data });
              // console.log( response.data.id );

              Global.LoadingEnd();
              
              thisClass.setState({ showVisible: false });
              thisClass.setState({ editVisible: true });

              setTimeout((function(){
                $(".editModel .ant-modal-content").scrollTop(0);
              }), 200);

              // console.log(response.data);
              // console.log(response.data.id);

              thisClass.setState({ dataId: response.data.id });
            })
            .catch(function (error) {
              Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
              console.log(error);
              Global.getAuth(error);
              Global.LoadingEnd();
            });
        }else if (event.target.getAttribute("data-button") === "delete") {

          confirm({
            title: '确定删除?',
            // content: 'Some descriptions',
            onOk() {
              // console.log('OK');
              Global.LoadingStart();

              axios.delete(Global.getUrl() + thisClass.props.modelUrl + "/" + record.id, config)
                .then(response => {
                  if (response.headers["access-token"]) {
                    Global.setTokenHeader(response);
                  }
                  // console.log(response.headers);
                  thisClass.updateList();
                  Global.openNotification({type:"success", title:"操作成功", body:thisClass.props.deleteTips});
                  Global.LoadingEnd();
                  
                })
                .catch(function (error) {
                  Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
                  console.log(error);
                  Global.getAuth(error);
                  Global.LoadingEnd();
                });
            },
            onCancel() {
              // console.log('Cancel');
            },
          });

        }
      }

      break;
    default:

  }
  // console.log(thisObject);
  return thisObject;

}

export default GetColumnConfig;