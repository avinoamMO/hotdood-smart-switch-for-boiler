import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import "./styles.css";
import SideBar from "./components/sidebar";
import Status from './components/status/Status'
import Analytics from './components/analytics/Analytics'
import Schedule from './components/schedule/Schedule'
import Settings from './components/settings/Settings'
import Home from './components/home'
import axios from 'axios';

export default class App extends Component {

  constructor(){
    super()

    this.state = {switchStatus : null}
  }
  getSwitchStatus(){

    axios.get(`http://localhost:3007/mockstatus`)
    .then(res => {
       this.setState({switchStatus : res.data.ison})
    })    
    return ("something")
  }

  turnSwitchOn(){
    const deviceIP = "192.168.43.170"
    
    axios.get(`http://${deviceIP}/relay/0?turn=on`)
.then(res => {
   console.log(res.data)
})    
  }

  turnSwitchOff(){
    const deviceIP = "192.168.43.170"
  
    axios.get(`http://${deviceIP}/relay/0?turn=off`)
.then(res => {
   console.log(res.data)
})    
  }


  render() {

    return (
      <Router>
      <div>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
      {/* <Route path="/status" exact component={Status}/> */}
      <Route path="/status" exact render={() => <Status 
                                                      turnSwitchOff={this.turnSwitchOff}
                                                      turnSwitchOn={this.turnSwitchOn} />}/>

      <Route path="/analytics" exact component={Analytics}/>
      <Route path="/schedule" exact component={Schedule}/>
      <Route path="/settings" exact component={Settings}/>
      <Route path="/" exact component={Home}/>


      </div>
      </Router>
    );
  }
}
