import React, { Component } from 'react';
import Global from '../Global';
import { Upload, Icon, Modal } from 'antd';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import $ from 'jquery';
// import Config from '../../../../src/Modules/Config';
import Config from '../Modules/Config';

class CkeditorImg extends Component {

  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      // fileListShowPic: [],
    };
    this.clipboard = this.clipboard.bind(this);
  }

  componentDidMount(props){
    // 如果出现length方法不能作用于undefined的报错 是配置项的错误此行代码没有错
    if (this.props.fileList !== undefined && this.props.fileList!==null && this.props.fileList !== "" && this.props.fileList.length !== 0) {

      let filelistArr = [];
      
      let fileArr = this.props.fileList.split(",");
      // console.log(fileArr);
      // let thisClass = this;
      $.each(fileArr, function(index, val) {

        let fileUrlArr = fileArr[index].split("/");
        let fileUrlArrLength = fileArr[index].split("/").length;
        let filelist = {};
        filelist.uid = index;
        filelist.key = index;
        filelist.id = fileUrlArr[fileUrlArrLength - 2];
        filelist.name = fileArr[index];
        filelist.status = "done";
        filelist.url = fileArr[index];
        filelist.thumbUrl = fileArr[index];

        filelistArr.push(filelist);
        // filelistArrShowPic.push(filelistShowPic);

      });

      // console.log(filelistArr);
      this.setState({ 
        fileList: filelistArr,
        // fileListShowPic: filelistArrShowPic
      });

    }else {
      this.setState({ 
        fileList: [], 
        // fileListShowPic: []
      });
    }

  }

  componentDidUpdate(){
    let thisClass = this;

    $(".btnClipList .btnCkeditorImgUrl").each(function(index, el) {
      $(".btnClipDoneList .ant-upload-list-item-done").eq(index).find(".ant-upload-list-item-actions").find(".btnCkeditorImgUrl").remove();
      $(".btnClipDoneList .ant-upload-list-item-done").eq(index).find(".ant-upload-list-item-actions").append($(this).clone());
    });

    // on('click', '.selector', function(event) {
    //   event.preventDefault();
    //   /* Act on the event */
    // });

    $(".btnCkeditorImgUrl").click(function(event) {
      thisClass.clipboard();
    });
    
  }

  clipboard(){
    Global.openNotification({type:"success", title:"操作成功", body:"图片链接已复制。"});
  }

  componentWillReceiveProps(props) {
    // console.log(this.props.fileList.length);
    if (this.props.fileList!==null && this.props.fileList !== "" && this.props.fileList.length !== 0) {

      let filelistArr = [];
      
      let fileArr = this.props.fileList.split(",");
      // console.log(fileArr);
      // let thisClass = this;
      $.each(fileArr, function(index, val) {

        let fileUrlArr = fileArr[index].split("/");
        let fileUrlArrLength = fileArr[index].split("/").length;
        let filelist = {};
        filelist.uid = index;
        filelist.key = index;
        filelist.id = fileUrlArr[fileUrlArrLength - 2];
        filelist.name = fileArr[index];
        filelist.status = "done";
        filelist.url = fileArr[index];
        filelist.thumbUrl = fileArr[index];
        

        filelistArr.push(filelist);

      });

      // console.log(filelistArr);
      this.setState({ 
        fileList: filelistArr,
      });

    }else {
      this.setState({ 
        fileList: [], 
        // fileListShowPic: []
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: "",
    });
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file, fileList, event }) => {

    // console.log(file);
    // console.log(fileList);
    // console.log(event);
    // console.log(this.state.fileList);

    let fileArr = fileList;
    let fileListArr = this.state.fileList;
    $.each(fileListArr, function(index, val) {
      if (fileArr[index] && fileArr[index].status === 'done') {
        fileArr[index].url = fileListArr[index].url;
      }
    });

    if (fileArr!==[]) {
      this.setState({ 
        fileList: fileArr
      });
    }else{
      this.triggerChange('');
    }


  }

  handleSuccess = (result, file) => {
    // console.log(result);
    // console.log(file);

    let fileArr = this.state.fileList;
    fileArr.pop();
    let fileArrResult = [];
    fileArr.push(result);

    $.each(fileArr, function(index, val) {
      fileArrResult.push(fileArr[index].url);
    });

    // console.log(fileArrResult.join(','));
    this.triggerChange(fileArrResult.join(','));
  }

  handleRemove = (file) => {
    // const config = Global.getHeader();
    const config = Global.getHeader();

    console.log(Global.getUrl() + Config.uploadImgUrl() + "/" + file.id);
    let thisClass = this;
    axios.delete(Global.getUrl() + Config.uploadImgUrl() + "/" + file.id, config)
      .then(response => {
        console.log(response.headers);
        if (response.headers["access-token"]) {
          Global.setTokenHeader(response);
        }
        Global.openNotification({type:"success", title:"操作成功", body:"图片已删除。"});

        let fileList = this.state.fileList;
        let fileListResult = [];
        let fileArrResult = [];

        $.each(fileList, function(index, val) {
          if (fileList[index].id !== file.id) {
            fileListResult.push(fileList[index]);
            fileArrResult.push(fileList[index].url);
          }
        });
        this.setState({ 
          fileList: fileListResult,
        });
        if (fileListResult!==[]) {
          this.triggerChange(fileArrResult.join(','));
        }else{
          this.triggerChange('');
        }

        Global.LoadingEnd();
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response);
        if (error.response.status === 404) {
          Global.openNotification({type:"success", title:"操作成功", body:"图片已删除。"});

          let fileList = thisClass.state.fileList;
          let fileListResult = [];
          let fileArrResult = [];
          console.log(fileList);

          $.each(fileList, function(index, val) {
            if (fileList[index].id !== file.id) {
              fileListResult.push(fileList[index]);
              fileArrResult.push(fileList[index].url);
            }
          });

          thisClass.setState({ 
            fileList: fileListResult,
            // fileListShowPic: fileListResult
          });

          if (fileListResult!==[]) {
            thisClass.triggerChange(fileArrResult.join(','));
          }else{
            thisClass.triggerChange('');
          }

        }else{
          Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
        }
        Global.getAuth(error);
        Global.LoadingEnd();
      });
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.

    const onChange = this.props.onChange;
    if (onChange) {

      // console.log(changedValue);
      onChange(Object.assign(changedValue));

    }

  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    
    // const copyTips = "复制成功!";

    return (
      <div className="clearfix btnClipDoneList">
        <Upload
          name={Config.uploadImgColumnName()}
          action={Global.getUrl() + Config.uploadImgUrl() + "/"}
          listType="picture-card"
          defaultFileList={fileList}
          fileList={fileList}
          headers={Global.getHeader()}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          onSuccess={this.handleSuccess}
        >

          {fileList.length >= 20 ? null : uploadButton}
        </Upload>
        <Modal
          wrapClassName="vertical-center-modal"
          width={"auto"}
          visible={previewVisible} 
          footer={null} 
          onCancel={this.handleCancel}
        >
          <img alt="img" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <div className="btnClipList" style={{ display: 'none' }}>
        {
          fileList.map(file => 
            <i title="复制链接" key={file.uid} className="anticon anticon-copy btnClip btnCkeditorImgUrl" data-clipboard-text={file.url}></i>
          )
        }
        </div>
      </div>
    );
  }
}

export default CkeditorImg;