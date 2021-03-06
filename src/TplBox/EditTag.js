import React, { Component } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';

class EditTag extends Component {

  constructor(props) {
    super(props);

    const value = props.value || "";
    // console.log(value)
    this.state = {
      value: value,
      tags: [],
      inputVisible: false,
      inputValue: "",
      key: 0
    };
  }

  componentDidMount(props){

    if (this.state.value) {
      let valueText = this.state.value;
      let valueArr = [];

      if (!Array.isArray(valueText)) {
        valueArr = valueText.split(",");
        this.setState({ tags: valueArr });
      }else{
        if (valueText!=="") {
          this.setState({ tags: valueText });
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== "") {
      if ('value' in nextProps) {
        this.setState({ value: nextProps.value });
        let valueText = nextProps.value;
        let valueArr = [];

        if (!Array.isArray(valueText)) {
          valueArr = valueText.split(",");
          this.setState({ tags: valueArr });
        }else{
          this.setState({ tags: valueText });
        }
      }
    }
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    
    this.setState({ tags });
    this.triggerChange(tags);
  }

  showInput = () => {
    this.setState({ inputValue: "" });
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);

    this.setState({ tags });
    this.triggerChange(tags);

    this.setState({
      inputVisible: false,
      inputValue: ""
    });

  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign(changedValue));
    }
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index > -1} afterClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ 添加</Button>}
      </div>
    );
  }
}

export default EditTag;