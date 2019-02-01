import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './css/App.css';
import './css/styles.css';

import {turnSwitchOff, turnSwitchOn, getSwitchStatus} from './SwitchMethods'
import SideBar from "./components/sidebar";
import Status from './components/status/Status'
import Analytics from './components/analytics/Analytics'
import Schedule from './components/schedule/Schedule'
import Settings from './components/settings/Settings'
import Home from './components/home'

export default class App extends Component {

  constructor(){
    super()

    this.setState({switchStatus : getSwitchStatus()})
  }


  render() {
  
    return (
      <Router>
      <div>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      <Route path="/status" exact render={() => <Status 
                                                      getSwitchStatus={getSwitchStatus}
                                                      turnSwitchOff={turnSwitchOff}
                                                      turnSwitchOn={turnSwitchOn} />}/>

      <Route path="/analytics" exact component={Analytics}/>
      <Route path="/schedule" exact component={Schedule}/>
      <Route path="/settings" exact component={Settings}/>
      <Route path="/" exact component={Home}/>


      </div>
      </Router>
    );
  }
}
