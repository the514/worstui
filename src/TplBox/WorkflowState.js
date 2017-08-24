import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
// import { Button } from 'antd';
import $ from 'jquery';

class WorkflowState extends Component {

  constructor(props) {
    super(props);
    // const value = props.value || "";
    this.state={
    	// iconLoading: false,
    	stateText: '',
    	buttonTpl: [],
    	actionValue: null,
    	value: null
    }
  }

  componentDidMount() {
  	let stateObj = this.props.stateObj;
  	// let dataId = this.props.dataId;
  	// console.log(this.props.actionValue);
  	// console.log(this.props.dataId);
  	// console.log(this.props.value);

  	let actionValue = "";
  	if (this.props.actionValue) {
  		actionValue = this.props.actionValue;

	  	this.setState({
	  		actionValue: actionValue,
	  		value: null,
	  	});

  	}else if (this.props.value) {
  		actionValue = this.props.value

	  	this.setState({
	  		actionValue: null,
	  		value: this.props.value,
	  	});
  	}

  	let thisClass = this;

  	// console.log(actionValue);
    $.each(stateObj.state, function(k, v) {
      if (k===actionValue) {
        // console.log(v.text);

        let buttonTpl = [];
        $.each(v.button, function(index, val) {

          buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} onClick={thisClass.enterIconLoading}>
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
  	// console.log(nextProps);

  	let stateObj = nextProps.stateObj;
  	let actionValue = "";
  	

    if (nextProps.actionValue) {
		  actionValue = nextProps.actionValue;
    
    	this.setState({
    		actionValue: nextProps.actionValue,
        value: null
    	});

    	let thisClass = this;

    	$.each(stateObj.state, function(k, v) {
    		if (k===actionValue) {

    			let buttonTpl = [];
  		  	$.each(v.button, function(index, val) {

  		  		buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} onClick={thisClass.enterIconLoading}>
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

  enterIconLoading = (e) => {

  	let stateObj = this.props.stateObj;
  	let dataId = this.props.dataId;
  	let target = e.target.getAttribute("data-action");
  	// var action = "";
		let result = "";
		let tips = "";
  	// let actionValue = this.props.actionValue;
  	let thisClass = this;

  	const config = Global.getHeader();

    // this.setState({ iconLoading: true });

  	const params = {};

  	Global.LoadingStart();

    axios.put(Global.getUrl() + stateObj.url + "/" + dataId + "/" + target, params, config)
      .then(response => {
        if (response.headers["access-token"]) {
          Global.setTokenHeader(response);
        }
        // console.log(response);
        if (response.status === 200) {

			  	$.each(stateObj.state, function(k, v) {
						// console.log(k);
            if (thisClass.state.actionValue !== null) {

              if (k===thisClass.state.actionValue) {

                $.each(v.button, function(index, val) {
                  
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

            }else{

              if (k===thisClass.state.value) {

                $.each(v.button, function(index, val) {
                  
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

			  	$.each(stateObj.state, function(k, v) {
			  		if (k===result) {
			  			// console.log(v.text);

			  			let buttonTpl = [];
					  	$.each(v.button, function(index, val) {

					  		buttonTpl.push(<button className="workflow-button" key={index} type="primary" data-action={val.action} onClick={thisClass.enterIconLoading}>
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
            this.props.updateList();
          }

        }
        Global.openNotification({type:"success", title:"操作成功", body: tips});
        Global.LoadingEnd();
      })
      .catch(function (error) {
        Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
        console.log(error);
        Global.getAuth(error);
        Global.LoadingEnd();
      });
  }

  render() {
    return (
    	<div>
    		<div style={{ borderBottom: '1px #eee solid', padding: '0 0 5px 0', margin: '0 0 5px 0' }}>
    			{this.state.stateText}
    		</div>
    		{this.state.buttonTpl}
			</div>
    );
  }
}

export default WorkflowState;
