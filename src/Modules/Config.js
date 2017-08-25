import React, { Component } from 'react';
import { Route } from 'react-router'
import { Menu, Icon } from 'antd';

import logo from './logo.svg';

const SubMenu = Menu.SubMenu;

class Config extends Component {

  static logo = () => {
  	return logo;
  }

  static projectCn = () => {
    return {
      title: "website title",
      copyright: "website title ©2017 Created by company name"
    };
  }

  static router = () => {
  	return (
  		<div>
        <Route exact path="/" />
			</div>
  	);
  }

  static nav = (thisClass) => {
    if (window.location.hash === "#/") {
    
      // thisClass.setState({ openKeys: ['sub1'] });
      // or
      // thisClass.setState({ openKeys: [''] });
    
    }
  }

  static navTpl = (thisClass) => {
  	return (
      <Menu
        theme="light"
        mode={thisClass.state.mode}
        openKeys={thisClass.state.openKeys}
        selectedKeys={thisClass.state.selectedKeys}
        onSelect={thisClass.selectMenu}
        defaultOpenKeys={thisClass.state.openKeys}
        defaultSelectedKeys={thisClass.state.selectedKeys}
        onOpenChange={thisClass.onOpenChange}
      >
	      <SubMenu
	        key="sub1"
	        title={<span><Icon type="user" /><span className="nav-text">用户管理</span></span>}
	      >
	        <Menu.Item key="#/">用户管理</Menu.Item>
	      </SubMenu>
  		</Menu>
  	);
  }

  static globalUrl = () => {
  	return "http://192.168.0.233:3001"; // server side ip
  }

  static uploadImgUrl = () => {
    return "/pictures";
  }

  static uploadImgColumnName = () => {
    return "picture[file_img]";
  }

  static loginUrl = () => {
    return "/auth/sign_in";
  }

  static jsonRequestType = () => {
    return "model"; // object:纯对象, model:model{参数}
  }

  static columnsDataSource = (key) => {
    if (key==="category_select" || key==="q[category_select_eq]") {

      return {
        modelUrl: "/categories",
        modelDataKey: "name_text",
        modelDataValue: "id",
        modelDataPlaceholder: "请选择分类",
        modelDataFilterText: "全部分类"
      };

    }else if (key==="sex_select") {

      return {
        modelJson: {
          "list": [
            {
              "id": 1,
              "name_text": "男"
            },
            {
              "id": 2,
              "name_text": "女"
            }
          ]
        },
        modelDataKey: "name_text",
        modelDataValue: "id",
        modelDataPlaceholder: "请选择性别",
      };

    }else if (key==="user_type_select") {

      return {
        modelUrl: "/user_types",
        modelDataKey: "name_text",
        modelDataValue: "id",
        modelDataPlaceholder: "请选择用户类型",
      };

    }else if (key==="area_id") {

      return {
        modelUrl: "/areas",
        modelDataKey: "name_text",
        modelDataValue: "id",
        modelDataPlaceholder: "请选择所在小区",
      };

    }else if (key==="building_id") {

      return {
        modelDataLinkage: true,
        modelUrl: ["/areas", "/buildings"],
        modelDataKey: ["name_text", "name_text"],
        modelDataValue: ["id", "id"],
        modelDataPlaceholder: ["请选择小区", "请选择楼栋"],
        modelDataColumn: ["area_id", "id"],
        modelDataParams: ["", "q[area_id_eq]"]
      };

    }else if (key==="unit_id" || key==="q[unit_id_eq]") {

      return {
        modelDataLinkage: true,
        modelUrl: ["/areas", "/buildings", "/units"],
        modelDataKey: ["name_text", "name_text", "name_text"],
        modelDataValue: ["id", "id", "id"],
        modelDataPlaceholder: ["请选择小区", "请选择楼栋", "请选择单元号"],
        modelDataFilterText: ["全部小区", "全部楼栋", "全部单元号"],
        modelDataFilterKey: ["q[area_id_eq]", "q[building_id_eq]", "q[unit_id_eq]"],
        modelDataColumn: ["area_id", "building_id", "id"],
        modelDataParams: ["", "q[area_id_eq]", "q[building_id_eq]"],
      };

    }else if (key==="role_id") {

      return {
        modelUrl: "/roles",
        modelDataKey: "name_text",
        modelDataValue: "id",
        modelDataPlaceholder: "请选择用户组",
      };

    }else if (key==="user_workflow_state") {

      return {
        url: '/users',
        state:{
          new: {
            text: "待审核",
            button: [{
              text: "审核",
              action: "accept",
              result: "accepted",
              tips: "商品已审核"
            },
            {
              text: "拒绝审核",
              action: "reject",
              result: "rejected",
              tips: "商品审核已驳回"
            }],
          },
          accepted: {
            text: "已审核",
            button: [{
              text: "拒绝审核",
              action: "reject",
              result: "rejected",
              tips: "商品审核已驳回"
            }],
          },
          rejected: {
            text: "审核拒绝",
            button: [{
              text: "审核",
              action: "accept",
              result: "accepted",
              tips: "商品已审核"
            }],
          },
        }
      };
    }
  }

  render() {
    return (
    	<div></div>
    );
  }
}

export default Config;
