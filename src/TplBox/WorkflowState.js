import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Modal } from 'antd';
import $ from 'jquery';
import GetFilterTpl from './GetFilterTpl'; // 筛选模版
import WorkflowStateColumnTpl from './WorkflowStateColumnTpl'; // 筛选模版

class WorkflowState extends Component {

  constructor(props) {
    super(props);
    // const value = props.value || "";
    this.state={
    	// iconLoading: false,
    	stateText: '',
    	buttonTpl: [],
    	actionValue: null,
    	value: null,
      newKey: 1,
      visible: false, // 如果需要额外输入的按钮 点击会显示弹出层
      modalTpl: null, // 弹出模版
      modalData: null, // 弹出模版数据
      workflowTextObj: {}, // 弹出模版对象
      target: "", // 目标操作
    }

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
  	let stateObj = this.props.stateObj; // 第一次加载获取状态配置
  	// let dataId = this.props.dataId;
  	// console.log(this.props.actionValue);
  	// console.log(this.props.dataId);
  	// console.log(this.props.value);

  	let actionValue = "";
  	if (this.props.actionValue || this.props.actionValue === 0) { // actionValue 是否有值 有值时 为list列表模式
  		actionValue = this.props.actionValue + "";

	  	this.setState({
	  		actionValue: actionValue, 
	  		value: null,
	  	});

  	}else if (this.props.value || this.props.value === 0) { // value 是否有值 有值时 为非list列表模式
  		actionValue = this.props.value + "";

	  	this.setState({
	  		actionValue: null,
	  		value: actionValue,
	  	});
  	}

  	let thisClass = this;

  	// console.log(actionValue);
    $.each(stateObj.state, function(k, v) { // 循环状态配置
      if (k===actionValue) { // 如果 配置字段===actionValue
        // console.log(v.text);

        let buttonTpl = [];
        $.each(v.button, function(index, val) { // 装填当前配置下按钮列表

          buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} data-state={actionValue} onClick={thisClass.enterIconLoading}>
                          {val.text}
                        </button>);
        });
        thisClass.setState({
          stateText: v.text,
          buttonTpl: buttonTpl
        });
      }
    });


  }

  componentWillReceiveProps(nextProps) {
  	// console.log(nextProps); // 当值发生改变回收

  	let stateObj = nextProps.stateObj;
  	let actionValue = null;
  	

    if (nextProps.actionValue || this.props.actionValue === 0) { // actionValue 是否有值 有值时 为list列表模式
		  actionValue = nextProps.actionValue + "";
    
    	this.setState({
    		actionValue: actionValue,
        value: null
    	});

    	let thisClass = this;

    	$.each(stateObj.state, function(k, v) { // 循环状态配置
    		if (k===actionValue) { // 如果 配置字段===actionValue

    			let buttonTpl = [];
  		  	$.each(v.button, function(index, val) { // 装填当前配置下按钮列表

  		  		buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} data-state={actionValue} onClick={thisClass.enterIconLoading}>
  													{val.text}
  												</button>);
  		  	});
    			thisClass.setState({
            stateText: v.text,
    				buttonTpl: buttonTpl
    			});

    		}
    	});
    }

  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleCancel = () => this.setState({ 
    visible: false,
    newKey: this.state.newKey===1?0:1
  })

  handleCreate = (e) => {

    // 状态按钮点击切换
    let stateObj = this.props.stateObj; // 加载状态配置
    let dataId = this.props.dataId; // 当前操作数据id
    let target = this.state.target; // 目标点击DOM的自定义属性 data-action
    // var action = "";
    let result = "";
    let tips = "";
    // let actionValue = this.props.actionValue;
    let thisClass = this;

    const config = Global.getHeader();

    // this.setState({ iconLoading: true });

    let params = {};

    params = thisClass.state.workflowTextObj;

    Global.LoadingStart();

    axios.put(Global.getUrl() + stateObj.url + "/" + dataId + "/" + target, params, config)
      .then(response => {
        if (response.headers["access-token"]) {
          Global.setTokenHeader(response);
        }
        // console.log(response);
        if (response.status === 200) { // 当状态切换成功

          $.each(stateObj.state, function(k, v) {
            // console.log(k);
            if (thisClass.state.actionValue !== null) { // 如果actionValue 不为空

              if (k===thisClass.state.actionValue) { // 如果 配置字段===actionValue

                $.each(v.button, function(index, val) { // 循环按钮
                  
                  if( v.button[index].action === target ){
                    // action = v.button[index].action;
                    result = v.button[index].result;
                    thisClass.setState({
                      actionValue: result,
                      value: null
                    });
                    tips = v.button[index].tips;
                  }

                });
              }

            }else{ // 如果value 不为空

              if (k===thisClass.state.value) { // 如果 配置字段===value

                $.each(v.button, function(index, val) { // 循环按钮
                  
                  if( v.button[index].action === target ){
                    // action = v.button[index].action;
                    result = v.button[index].result;
                    thisClass.setState({
                      actionValue: null,
                      value: result
                    });
                    tips = v.button[index].tips;
                  }

                });
              }

            }


          });

          $.each(stateObj.state, function(k, v) { // 循环状态配置
            if (k===result) { // 如果配置字段===结果字段
              // console.log(v.text);

              let buttonTpl = [];
              $.each(v.button, function(index, val) { // 循环装填按钮

                buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} data-state={result} onClick={thisClass.enterIconLoading}>
                                {val.text}
                              </button>);
              });
              thisClass.setState({
                stateText: v.text,
                buttonTpl: buttonTpl
              });
            }
          });

          if (this.props.updateList) {
            this.props.updateList(); // 更新列表
          }

          thisClass.setState({
            visible: false,
            workflowTextObj: {},
            newKey: this.state.newKey===1?0:1
          });
          

        }
        Global.openNotification({type:"success", title:"操作成功", body: tips});
        Global.LoadingEnd();
      })
      .catch(function (error) {
        thisClass.setState({
          visible: true
        });
        if (error.response.status === 422) {
          Global.openNotification({type:"error", title:"操作失败", body:error.response.data.rs_msg});
        }else{
          Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
        }
        console.log(error);
        Global.getAuth(error);
        Global.LoadingEnd();
      });
  }

  enterIconLoading = (e) => {
    // 状态按钮点击切换
  	let stateObj = this.props.stateObj; // 加载状态配置
  	let dataId = this.props.dataId; // 当前操作数据id
    let target = e.target.getAttribute("data-action"); // 目标点击DOM的自定义属性 data-action
  	let targetState = e.target.getAttribute("data-state"); // 目标点击DOM的自定义属性 data-state
  	// var action = "";
		let result = "";
		let tips = "";
  	// let actionValue = this.props.actionValue;
  	let thisClass = this;

  	const config = Global.getHeader();

    // this.setState({ iconLoading: true });

  	const params = {};

    let isModal = false;
    let modalTpl = [];

    $.each(stateObj.state, function(key, val) {
      $.each(stateObj.state[key].button, function(i, v) {
        if (stateObj.state[key].button[i].action === target && key === targetState) {
          
          isModal = stateObj.state[key].button[i].isModal;

          if (isModal) {
            let modalCount = 0;
            $.each(stateObj.state[key].button[i].modalTpl, function(index, value) {
              modalTpl.push(
                <WorkflowStateColumnTpl columnKey={stateObj.state[key].button[i].modalTpl[index].key}
                              type={stateObj.state[key].button[i].modalTpl[index].type}
                              key={key + "" + i + "" + index + "" + dataId}
                              value={stateObj.state[key].button[i].modalTpl[index].value}
                              title={stateObj.state[key].button[i].modalTpl[index].title}
                              placeHolder={stateObj.state[key].button[i].modalTpl[index].placeHolder}
                              onChange={thisClass.handleChange}
                />
              );
            });
          }

        }
      });
    });

    if (isModal) {

      this.setState({
        visible: true,
        modalTpl: modalTpl,
        target: target
      });

    }else{

      Global.LoadingStart();

      axios.put(Global.getUrl() + stateObj.url + "/" + dataId + "/" + target, params, config)
        .then(response => {
          if (response.headers["access-token"]) {
            Global.setTokenHeader(response);
          }
          // console.log(response);
          if (response.status === 200) { // 当状态切换成功

  			  	$.each(stateObj.state, function(k, v) {
  						// console.log(k);
              if (thisClass.state.actionValue !== null) { // 如果actionValue 不为空

                if (k===thisClass.state.actionValue) { // 如果 配置字段===actionValue

                  $.each(v.button, function(index, val) { // 循环按钮
                    
                    if( v.button[index].action === target ){
                      // action = v.button[index].action;
                      result = v.button[index].result;
                      thisClass.setState({
                        actionValue: result,
                        value: null
                      });
                      tips = v.button[index].tips;
                    }

                  });
                }

              }else{ // 如果value 不为空

                if (k===thisClass.state.value) { // 如果 配置字段===value

                  $.each(v.button, function(index, val) { // 循环按钮
                    
                    if( v.button[index].action === target ){
                      // action = v.button[index].action;
                      result = v.button[index].result;
                      thisClass.setState({
                        actionValue: null,
                        value: result
                      });
                      tips = v.button[index].tips;
                    }

                  });
                }

              }

  			  	});

  			  	$.each(stateObj.state, function(k, v) { // 循环状态配置
  			  		if (k===result) { // 如果配置字段===结果字段
  			  			// console.log(v.text);

  			  			let buttonTpl = [];
  					  	$.each(v.button, function(index, val) { // 循环装填按钮

  					  		buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} data-state={result} onClick={thisClass.enterIconLoading}>
  																{val.text}
  															</button>);
  					  	});
  			  			thisClass.setState({
                  stateText: v.text,
  			  				buttonTpl: buttonTpl
  			  			});
  			  		}
  			  	});

            if (this.props.updateList) {
              this.props.updateList(); // 更新列表
            }

          }
          Global.openNotification({type:"success", title:"操作成功", body: tips});
          Global.LoadingEnd();
        })
        .catch(function (error) {
          if (error.response.status === 422) {
            Global.openNotification({type:"error", title:"操作失败", body:error.response.data.rs_msg});
          }else{
            Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
          }
          console.log(error);
          Global.getAuth(error);
          Global.LoadingEnd();
        });
      
    }
    
  }

  handleChange = (e, dataString) => { // workflow字段 onChange 事件
    let workflow_result = this.state.workflowTextObj;

    // console.log(workflow_result);

    if (dataString!==undefined) {
      workflow_result[e.target.getAttribute("data-workflow")] = dataString;
    }else{
      workflow_result[e.target.getAttribute("data-workflow")] = e.target.value;
    }
    // console.log(e.target.getAttribute("data-workflow"));

    console.log(workflow_result);

    this.setState({
      workflowTextObj: workflow_result
    });
  }

  render() {
    return (
    	<div>
    		<div style={{ borderBottom: '1px #eee solid', padding: '0 0 5px 0', margin: '0 0 5px 0' }}>
    			{this.state.stateText}
    		</div>
    		{this.state.buttonTpl}
        <Modal
          key={this.state.newKey}
          title={this.state.title}
          width={600}
          style={{overflow: "hidden", top: "40px"}}
          okText="确定"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleCreate}
        >
          {this.state.modalTpl}
        </Modal>
			</div>
    );
  }
}

export default WorkflowState;
