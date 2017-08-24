import React from 'react'
// import Config from './Modules/Config';
import './App.css';
import { HashRouter } from 'react-router-dom'
import {
  Route,
  Switch
} from 'react-router'
import Login from './Login/Login';
import Table from './Table';

class App extends React.Component {

  componentDidMount() {
    // console.log(this.state.selectedKeys);
  }

  componentDidUpdate(props){
    // console.log(window.location.hash);
  }

  render() {

    return (
      <HashRouter>
        <div>
          <Switch>
            <Route path='/login' component={ Login } />
            <Route path='/' component={ Table } />
          </Switch>
        </div>
      </HashRouter>
    );
  }

}

export default App;
