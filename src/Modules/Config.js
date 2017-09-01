import React, { Component } from 'react';
import { Route } from 'react-router'
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

class Config extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
      
  }

  static logo = () => {
  	return window.worstui_logo;
  }

  static projectCn = () => {
    return window.worstui_projectCn;
  }

  static router = () => {
  	return (
  		window.worstui_router
  	);
  }

  static nav = (thisClass) => {
    window.worstui_nav(thisClass);
  }

  static navTpl = (thisClass) => {
  	return (
      window.worstui_navTpl(thisClass)
  	);
  }

  static globalUrl = () => {
  	return window.worstui_globalUrl; // server side ip
  }

  static uploadImgUrl = () => {
    return window.worstui_uploadImgUrl;
  }

  static uploadImgColumnName = () => {
    return window.worstui_uploadImgColumnName;
  }

  static loginUrl = () => {
    return window.worstui_loginUrl;
  }

  static jsonRequestType = () => {
    return window.worstui_jsonRequestType; // object:纯对象, model:model{参数}
  }

  static columnsDataSource = (key) => {
    return window.worstui_columnsDataSource(key);
  }

  render() {
    return (
    	<div></div>
    );
  }
}

export default Config;
