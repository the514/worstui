import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import $ from 'jquery';
import Global from './Global';
import Config from './Modules/Config';

const { Sider, Footer } = Layout;
// const SubMenu = Menu.SubMenu;
const ButtonGroup = Button.Group;

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedKeys: ['#'],
      openKeys: ['sub1'],
      collapsed: false,
      signOutButton: "block",
      mode: 'inline',
      currentHash: "#/",
      currentTitle: "",
      tableTpl: null
    };

    this.selectMenu = this.selectMenu.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedKeys: [window.location.hash],
      openKeys: this.props.openKeys,
    });

    $("title").text( Config.projectCn().title );

    Config.nav(this);
  }

  componentDidUpdate(props){
    // console.log(window.location.hash);
  }

  onOpenChange = (openKeys) => {

    // console.log(openKeys);
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }

  signOut = () => {
    Global.signOut();
  }
  
  getAncestorKeys = (key) => {
    const map = {
    };
    return map[key] || [];
  }

  onCollapse = (collapsed, type) => {
    // console.log(collapsed);
    // console.log(type);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
      signOutButton: collapsed ? 'none' : 'block'
    });

  }

  // onSelect( item, key, selectedKeys ) { 
  //   console.log(item);
  //   console.log(key);
  //   console.log(selectedKeys);
  // }

  selectMenu(item) {
    // console.log(item);
    // console.log(item.item.props.title);
    this.setState({selectedKeys: [item.key]});
    window.location.hash = item.key;
  }

  render() {
    const logoStyle = {
      display: 'block',
      margin: '0 auto',
    };

    return (
      <Layout style={{ width: '100%', height: '100%', position: 'absolute', overflow: 'hidden' }}>
	      <Sider
	        collapsible
	        collapsed={this.state.collapsed}
	        onCollapse={this.onCollapse}
	        style={{ background: '#fff', transition: 'none' }}
	      >
	        <div className="logo">
	          <img src={Config.logo()} width="35" alt="logo" style={logoStyle} />
	        </div>
          <div className="user" style={{width: "100%", textAlign: "center", marginBottom: "20px", display: this.state.signOutButton}}>
            <ButtonGroup>
              <Button>{localStorage.getItem("admin-uid")?(localStorage.getItem("admin-uid")==="1"?"admin":localStorage.getItem("admin-uid")):"无"}</Button>
              <Button type="primary" icon="poweroff" onClick={this.signOut}>退出</Button>
            </ButtonGroup>
          </div>

            { Config.navTpl(this) }

      	</Sider>
      	<Layout className="animate-content" style={{ overflow: 'auto' }}>

      		{ Config.router() }

          <Footer style={{ textAlign: 'center' }}>
            { Config.projectCn().copyright }
          </Footer>
      	</Layout>
      </Layout>
    );
  }

}

export default Table;
