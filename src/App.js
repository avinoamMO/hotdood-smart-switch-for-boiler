import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route} from 'react-router-dom'
import './css/App.css';
import './css/styles.css';

// import {turnSwitchOff, turnSwitchOn, getSwitchStatus} from './SwitchMethods'
import SideBar from "./components/sidebar";
import Status from './components/status/Status'
import Analytics from './components/analytics/Analytics'
import Schedule from './components/schedule/Schedule'
import Settings from './components/settings/Settings'
import Home from './components/home'
import Login from './components/Login'
import axios from "axios";

export default class App extends Component {
  constructor(){
  super()
     
      this.state = {switchStatus : null, dataLoaded: false}
    }
     
    componentDidMount(){
      this.getSwitchStatus();  
    }

    getSwitchStatus(){
      axios.get(`http://localhost:3007/status`).then(res => {
        this.setState({dataLoaded:true,switchStatus:res.data})
        console.log(`this.state.switchStatus = ${this.state.switchStatus}`)
      }).catch(function(error){
        console.log(error);
      })
    }
    
    turnSwitchOn =()=> {
      console.log("sending turn on request")  
        axios.get(`http://localhost:3007/turnOn`).then(res => {
        this.getSwitchStatus();
        if(res.data.ison===false){
            setTimeout(this.turnSwitchOn,1500)
        }
        })}
      
        turnSwitchOff= ()=> {
          console.log("sending turn off request")
          axios.get(`http://localhost:3007/turnOff`).then(res => {
          this.getSwitchStatus();
          if(res.data.ison===true){
                setTimeout(this.turnSwitchOff,1500)
            }
          })}
        
      
  render() {
  
    
    return (
      <Router>
      <div>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
      <Route path="/status" exact render={() => <Status 
                                                      switchStatus={this.state.switchStatus}
                                                      turnSwitchOff={this.turnSwitchOff}
                                                      turnSwitchOn={this.turnSwitchOn} />}/>
      <Route path="/analytics" exact component={Analytics}/>
      <Route path="/schedule" exact component={Schedule}/>
      <Route path="/settings" exact component={Settings}/>
      <Route path="/" exact component={Login}/>


      </div>
      </Router>
    );
  }
}
