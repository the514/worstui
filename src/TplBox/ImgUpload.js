import React, { Component } from 'react';
import Global from '../Global';
import { Upload, Icon, Modal, Button, Popover } from 'antd';
import axios from 'axios';
// import Config from '../../../../src/Modules/Config';
import Config from '../Modules/Config';

const confirm = Modal.confirm;

class ImgUpload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
  }

  componentDidMount(props){
    this.setState({ fileList: [] });
    // console.log(this.props.fileList);
    if (this.props.fileList!==null && this.props.fileList !== "" && this.props.fileList !== undefined) {
      if (this.props.fileList !== "") {
        let filelistArr = [];
        let filelist = {};
        // console.log(this.props.fileList.split("/"));
        // console.log(this.props.fileList.split("/").length);
        if (this.props.fileList.indexOf("/") > 1) {
          // console.log("进到里面");
          let fileUrlArr = this.props.fileList.split("/");
          let fileUrlArrLength = this.props.fileList.split("/").length;
          // console.log(fileUrlArr[fileUrlArrLength - 2]);
          filelist.uid = fileUrlArr[fileUrlArrLength - 2];
          filelist.name = this.props.fileList;
          filelist.status = "done";
          filelist.url = this.props.fileList;

          filelistArr.push(filelist);
        }

        // console.log(filelistArr);
        this.setState({ fileList: filelistArr });
      }else{
        this.setState({ fileList: [] });
      }
    }else {
      this.setState({ fileList: [] });
    }
  }

  componentWillReceiveProps(props) {
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ file, fileList, event }) => {

    // console.log(file);
    // console.log(fileList);
    // console.log(event);

    this.setState({ fileList });

  }

  handleSuccess = (result, file) => {
    // console.log(result);
    // console.log(file);

    this.setState({ 
      fileList: [result]
    });
    this.triggerChange(result.url);
  }

  handleRemove = (file) => {
    // const config = Global.getHeader();
    let thisClass = this;
    // console.log(file);
    confirm({
      title: '确定删除?',
      // content: 'Some descriptions',
      onOk() {

        const config = Global.getHeader();
        // console.log(thisClass.props.url + Config.uploadImgUrl() + "/" + file.uid);
        axios.delete(thisClass.props.url + Config.uploadImgUrl() + "/" + file.uid, config)
          .then(response => {
            console.log(response.headers);
            if (response.headers["access-token"]) {
              Global.setTokenHeader(response);
            }
            Global.openNotification({type:"success", title:"操作成功", body:"图片已删除。"});
            thisClass.triggerChange("");
            Global.LoadingEnd();
          })
          .catch(function (error) {
            console.log(error);
            if (error.response.status === 404) {
              Global.openNotification({type:"success", title:"操作成功", body:"图片已删除。"});
              thisClass.triggerChange("");
            }else{
              Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
            }
            Global.getAuth(error);
            Global.LoadingEnd();
          });

      },
      onCancel() {
        // console.log('Cancel');
        let filelistArr = [];
        let filelist = {};

        filelist.uid = file.uid;
        filelist.name =  file.name;
        filelist.status = "done";
        filelist.url = file.url;
        filelistArr.push(filelist);
        // console.log(filelistArr);
        thisClass.setState({ fileList: filelistArr });
      },
    });
    
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.

    const onChange = this.props.onChange;
    if (onChange) {
      console.log(changedValue);
      onChange(changedValue);
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
    const copyTips = "复制成功!";

    return (
      <div className="clearfix">
        <Upload
          name={Config.uploadImgColumnName()}
          action={this.props.url + Config.uploadImgUrl() + "/"}
          listType="picture-card"
          defaultFileList={fileList}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          onSuccess={this.handleSuccess}
        >
          {fileList.length >= 1 ? null : uploadButton}
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
        {
          fileList.length >= 1 &&
          <div className="clearfix" style={{ clear: 'both', width: '100%' }}>
            <Popover content={copyTips} title={null} trigger="click">
              <Button className="btnClip" type="primary" style={{ width: '96px' }} data-clipboard-text={this.props.fileList} ghost>复制链接</Button>
            </Popover>
          </div>
        }
      </div>
    );
  }
}

export default ImgUpload;