import React, { Component } from 'react';
import { notification } from 'antd';
// import axios from 'axios';
import $ from 'jquery';
import Config from './Modules/Config';

var hope = "";

class Global extends Component {

    static LoadingStart = () => {
      $(".loading").fadeIn();
	  }

    static LoadingEnd = () => {
      $(".loading").fadeOut();
    }

    static getUrl () {
      return Config.globalUrl();
    }

    static getFileUrl () {
      return Config.globalUrl();
    }

    static columnsDataSource (key) {
      let obj = Config.columnsDataSource(key);
      return obj;
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
          window.location.hash = "#login";
          $(".loading").fadeOut();
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