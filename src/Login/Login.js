import React, { Component } from 'react';
import './login.css';
import Global from '../Global';
import axios from 'axios';
import $ from 'jquery';
import Config from '../Modules/Config';

function LoginTpl (props) {

  const divStyle = {
    display: 'none'
  };

  return (
    <div className="sign_in">
      <div className='container-fluid'>
        <h1>{ Config.projectCn().title } · 登录</h1>
        <div className='sign-in-form'>
          <div className='sign-in-top'>
            <div className='border-left'></div>
            <div className='border-right'></div>
            <div className='logo'>
              <img alt='logo' src='/static/images/noavatar.png' />
            </div>
          </div>
          <div className='sign-in-bottom'>
            <div className='bd'>
              <div id='alert' style={divStyle}>
                <i className='fa fa-exclamation-circle'></i>
                用户名或密码错误
              </div>
              <form className="new_user" id="new_user" method="post">
                <div className='field'>
                  <i className='fa fa-user'></i>
                  <input placeholder="用户名" type="text" value={props.stateMobile || ''} name="user[login]" id="user_login" onChange={props.mobile} />
                </div>
                <div className='field'>
                  <i className='fa fa-lock'></i>
                  <input autoComplete="off" placeholder="密码" value={props.statePassword || ''} type="password" name="user[password]" id="user_password" onChange={props.password} />
                </div>
                <div className='actions'>
                  <input type='button' value='登录' onClick={props.onSubmit} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='copyright'>
          <p>{ Config.projectCn().copyright }</p>
        </div>
      </div>
    </div>
  );
}

class Login extends Component {

  constructor(props) {
    super(props);

    this.mobile = this.mobile.bind(this);
    this.password = this.password.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      mobile: "",
      password: "",
      headers: {}
    };

  }

  componentDidMount() {
    $("title").text( Config.projectCn().title );
    // const config = {
    //   headers: {
    //     // 'Content-type': 'application/json',
    //     'Accept': 'application/json',
    //     'access-token': localStorage.getItem("admin-access-token"),
    //     'client': localStorage.getItem("admin-client"),
    //     'uid': localStorage.getItem("admin-uid"),
    //     'expiry': localStorage.getItem("admin-expiry"),
    //     'token-type': 'Bearer'
    //   }
    // };

    // Global.LoadingStart();
    // axios.get(Global.getUrl() + products_url, config)
    //   .then(response => {
    //     console.log(config);
    //     Global.LoadingEnd();
    //     window.location.href = "./";
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
    //     Global.LoadingEnd();
    //   });

    $(document).ready(function(){
      setTimeout((function(){
        var window_height = $(window).height();
        var form_height = $(".sign-in-form").height();
        
        if(window_height > 0){
          $(".sign-in-form").css("marginTop",((window_height-form_height-50)/2)+"px").fadeIn();
        }
    
      }),300);
    });

    var $this = this;
    $(".actions").parents("form").keydown(function(event){ 
      if( event.which === 13 ){
        $this.onSubmit(event);
      }
    });
  }

  mobile(e){
    this.setState({mobile: e.target.value});
  }

  password(e){
    this.setState({password: e.target.value});
  }

  onSubmit = (e) => {

    var params = {
      account_text: this.state.mobile,
      password_text: this.state.password
    }

    // const config = Global.getHeader();
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'token-type': 'Bearer',
        'access-token': '',
        'client': '',
        'uid': '',
        'expiry': '',
      }
    }

    console.log(Global.getUrl() + Config.loginUrl());
    
    Global.LoadingStart();
    axios.post(Global.getUrl() + Config.loginUrl(), params, config)
      .then(response => {
        console.log(response);
        console.log(response.headers);
        console.log(config);
        Global.setLoginTokenHeader(response);

        Global.LoadingEnd();
        if (localStorage.getItem("admin-access-token")) {
          window.location.href = "./";
        }
      })
      .catch(function (error) {
        console.log(error);
        Global.openNotification({type:"error", title:"账号或密码错误", body:"请重试登录！"});
        Global.LoadingEnd();
      });

  }

  render() {
    return (
      <LoginTpl mobile={this.mobile} password={this.password} stateMobile={this.state.mobile} statePassword={this.state.password} onSubmit={this.onSubmit} />
    )
  }

}

export default Login;
