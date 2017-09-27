import React, { Component } from 'react';
import { notification } from 'antd';
// import axios from 'axios';
// import $ from 'jquery';
// import Config from '../../../src/Modules/Config';
import Config from './Modules/Config';

var hope = ""; // 有些变量不是拿来用的, 是值得占有一部分内存的希望.

class Global extends Component {

    static LoadingStart = () => {
      // $(".loading").fadeIn();
      // let element = document.querySelector(".loading");
      // let op = 0.1;  // initial opacity
      // element.style.display = 'block';
      // let timer = setInterval(function () {
      //     if (op >= 1){
      //         clearInterval(timer);
      //     }
      //     element.style.opacity = op;
      //     element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      //     op += op * 0.1;
      // }, 10);
      let element = document.querySelector(".loading");
      element.classList.remove("fadeOut");
      element.classList.add("fadeIn");
	  }

    static LoadingEnd = () => {
      // $(".loading").fadeOut();
      // let element = document.querySelector(".loading");
      // var op = 1;  // initial opacity
      // var timer = setInterval(function () {
      //     if (op <= 0.1){
      //         clearInterval(timer);
      //         element.style.display = 'none';
      //     }
      //     element.style.opacity = op;
      //     element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      //     op -= op * 0.1;
      // }, 50);
      let element = document.querySelector(".loading");
      element.classList.remove("fadeIn");
      element.classList.add("fadeOut");
    }

    static getUrl () {
      return Config.globalUrl();
    }

    static getFileUrl () {
      return Config.globalUrl();
    }

    static columnsDataSource (key) {
      return Config.columnsDataSource(key);
    }

    static setTokenHeader(response) {
      localStorage.setItem("admin-access-token", response.headers["access-token"]);
      localStorage.setItem("admin-client", response.headers["client"]);
      localStorage.setItem("admin-uid", response.headers["uid"]);
      localStorage.setItem("admin-expiry", response.headers["expiry"]);
    }

    static setLoginTokenHeader(response) {
      localStorage.removeItem("admin-access-token");
      localStorage.removeItem("admin-client");
      localStorage.removeItem("admin-uid");
      localStorage.removeItem("admin-expiry");

      // if (response.headers["uid"]==="1") {
      //   localStorage.setItem("admin-access-token", response.headers["access-token"]);
      //   localStorage.setItem("admin-client", response.headers["client"]);
      //   localStorage.setItem("admin-uid", response.headers["uid"]);
      //   localStorage.setItem("admin-expiry", response.headers["expiry"]);
      // }
      localStorage.setItem("admin-access-token", response.headers["access-token"]);
      localStorage.setItem("admin-client", response.headers["client"]);
      localStorage.setItem("admin-uid", response.headers["uid"]);
      localStorage.setItem("admin-expiry", response.headers["expiry"]);
      
    }

    static signOut(response) {
      localStorage.removeItem("admin-access-token");
      localStorage.removeItem("admin-client");
      localStorage.removeItem("admin-uid");
      localStorage.removeItem("admin-expiry");
      window.location.hash = "#login";
    }

    static getHeader() {
      return {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'access-token': localStorage.getItem("admin-access-token"),
          'client': localStorage.getItem("admin-client"),
          'uid': localStorage.getItem("admin-uid"),
          'expiry': localStorage.getItem("admin-expiry"),
          'token-type': 'Bearer'
        }
      }
    }


    static getAuth (props) {
      if (props.response) {
        console.log(props.response)
        if (props.response.status === 401) {
          if (localStorage.getItem("admin-access-token")) {
            Global.openNotification({type:"error", title:"账号认证失败", body:"请重新登录！"});
          }
          Global.LoadingStart();
          window.location.hash = "#login";
        }
      }else {
        Global.openNotification({type:"error", title:"操作失败", body:"请求超时，请刷新重试！"});
      }
    }

    static openNotification (props) {
      notification[props.type]({
        message: props.title,
        description: props.body,
      });
    }

    static getToken () {
      var token = "";
      if (localStorage.getItem("token")) {
        token = "?token=" + localStorage.getItem("token");
      }
      return token;
    }

    render() {
      return (
      	<div></div>
      );
    }
}

export default Global;