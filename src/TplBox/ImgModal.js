import React, { Component } from 'react';
import { Modal } from 'antd';
// 图片模态框
class ImgModal extends Component {
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => this.setState({ visible: false })
  render() {
    return (
      <div>
        <img src={this.props.imgSrc} style={{cursor: "pointer"}} alt="缩略图" height={this.props.height} onClick={this.showModal} />
        <Modal
          wrapClassName="vertical-center-modal"
          width={"auto"}
          footer={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
        >
          <img src={this.props.imgSrc} alt="详情图" style={{width: "100%"}} />
        </Modal>
      </div>
    );
  }
}

export default ImgModal;