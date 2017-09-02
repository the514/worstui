import React, { Component } from 'react';
import Global from '../Global';
import { Icon, Modal, Button, Popover } from 'antd';
import axios from 'axios';
// import Config from '../../../../src/Modules/Config';
// import Config from '../Modules/Config';

class ImgSynchroUpload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      previewVisible: false,
      previewImage: '',
      imgUrl: ''
    };
  }

  componentDidMount(props){
    this.setState({ 
      imgUrl: this.props.value,
      previewImage: this.props.value, 
    });
  }

  componentWillReceiveProps(props) {
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewVisible: true,
    });
  }

  handleChange = (e) => {

    // console.log(file);
    // console.log(fileList);
    // console.log(event);
    console.log(e.target.files[0]);

    // this.setState({ imgUrl: e.target.files[0] });
    this.triggerChange(e.target.files[0]);

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
        <input type="file" onChange={this.handleChange} />
      </div>
    );
    const copyTips = "复制成功!";

    return (
      <div className="clearfix">
        { uploadButton }
        {
          (typeof this.state.imgUrl === 'string' || this.state.imgUrl instanceof String) &&
          <div className="imgShow" style={{marginTop: 10}}>
            <img alt="img" src={ previewImage } style={{ width: '96px', cursor: "pointer" }} onClick={ this.handlePreview } />
          </div>
        }
        <Modal
          wrapClassName="vertical-center-modal"
          width={"auto"}
          visible={previewVisible} 
          footer={null} 
          onCancel={this.handleCancel}
        >
          <img alt="img" style={{ width: '100%' }} src={ previewImage } />
        </Modal>
        {
          (typeof this.state.imgUrl === 'string' || this.state.imgUrl instanceof String) &&
          <div className="clearfix" style={{ clear: 'both', width: '100%' }}>
            <Popover content={copyTips} title={null} trigger="click">
              <Button className="btnClip" type="primary" style={{ width: '96px' }} data-clipboard-text={this.state.imgUrl} ghost>复制链接</Button>
            </Popover>
          </div>
        }
      </div>
    );
  }
}

export default ImgSynchroUpload;