import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route} from 'react-router-dom'
import './css/App.css';
import './css/styles.css';
import SideBar from "./components/sidebar";
import Status from './components/status/Status'
import Analytics from './components/analytics/Analytics'
import Schedules from './components/schedules/Schedules'
import Settings from './components/settings/Settings'
import Login from './components/Login'
import axios from "axios";
import ManageUsers from './components/settings/ManageUsers'
import ManageDevice from './components/settings/ManageDevice'

export default class App extends Component {
  constructor(){
  super()
     
      this.state = {switchStatus : null, dataLoaded: false,
                    users: null, schedules: null, operationrecords:null}
    }
     
    componentDidMount(){
       this.getSwitchStatus();
      
    }

    getUsers = () => {
      axios
        .get(`http://localhost:3007/getUsers`)
        .then(res => {
          this.setState({ users: res.data });
          console.log(`this.state.users = ${this.state.users}`);
        })
        .catch(function(error) {
          console.log(error);
        });
    };
    
     getSchedules = () => {
      axios
        .get(`http://localhost:3007/getSchedules`)
        .then(res => {
          console.log(res.data);
          this.setState({
            schedules: res.data.schedule_rules,
            isScheduleOn: res.data.schedule
          });
          console.log(`this.state.schedules = ${this.state.schedules}`);
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    setNewSchedule = (sch) =>{
      console.log("appjsl60")
      let data = JSON.stringify(sch)
      axios
        .get(`http://localhost:3007/saveNewSchedule/${data}`)
        .then(res => {
          // this.setState({ operationrecords: res.data });
          console.log(res.data)
          this.getSchedules();
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    deleteAnEvent = (sch) =>{
      let data = JSON.stringify(sch)
      axios
        .get(`http://localhost:3007/deleteAnEvent/${data}`)
        .then(res => {
          this.setState({ operationrecords: res.data });
          this.getSchedules();
          
        })
        .catch(function(error) {
          console.log(error);
        });
    }

     getOperationRecords = () => {
      axios
        .get(`http://localhost:3007/getOperationRecords`)
        .then(res => {
          this.setState({ operationrecords: res.data });
          console.log(
            `this.state.operationrecords = ${this.state.operationrecords}`
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    };
    
     getSwitchStatus = () => {
      axios
        .get(`http://localhost:3007/status`)
        .then(res => {
          this.setState({ dataLoaded: true, switchStatus: res.data });
          console.log(`this.state.switchStatus = ${this.state.switchStatus}`);
        })
        .catch(function(error) {
          console.log(error);
          return error;
        });
    };
    
     turnSwitchOn = () => {
      console.log("sending turn off request");

          axios.get(`http://localhost:3007/turnOn`).then(res => {
            this.getSwitchStatus();
            if (res.data.ison === false) {
              setTimeout(this.turnSwitchOn, 1500);
            }
          });
        }

        turnSwitchOnWithInterval = (intervalValueInSeconds, props) => {
          console.log(intervalValueInSeconds)
          let interval = parseInt(intervalValueInSeconds);
          interval = interval*60;
          console.log(`interval = ${intervalValueInSeconds}m = ${interval}s`)
          axios.get(`http://localhost:3007/turnOnWithInterval/int erval=${interval}`).then(res => {
            this.getSwitchStatus();
            if (res.data.ison === false) {
              setTimeout(this.turnSwitchOn, 1500);
            }
          });
        }
    
     turnSwitchOff = () => {
      console.log("sending turn off request");
      axios.get(`http://localhost:3007/turnOff`).then(res => {
        this.getSwitchStatus();
        if (res.data.ison === true) {
          setTimeout(this.turnSwitchOff, 1500);
        }
      });
    };
    
      
  render() {
  
    
    return (
      <Router>
      <div>
      <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"}/>
      <Route path="/status" exact render={() => <Status 
                                                      switchStatus={this.state.switchStatus}
                                                      turnSwitchOff={this.turnSwitchOff}
                                                      turnSwitchOn={this.turnSwitchOn} 
                                                      turnSwitchOnWithInterval ={this.turnSwitchOnWithInterval}/>}/>
      <Route path="/analytics" exact render={() => <Analytics 
                                                      getOperationRecords={this.getOperationRecords} 
                                                      operationRecords={this.state.operationrecords}/>}/>
      
      <Route path="/schedules" exact render={() => <Schedules
                                                      getSchedules={this.getSchedules}
                                                      setNewSchedule={this.setNewSchedule}
                                                      deleteAnEvent={this.deleteAnEvent}
                                                      schedules = {this.state.schedules}
                                                      isScheduleOn = {this.state.isScheduleOn} />}/>
      
      <Route path="/settings/manageUsers" exact render={() => <ManageUsers
                                                      getUsers={this.getUsers}
                                                      users = {this.state.users}/>}/>


      <Route path="/settings" exact component={Settings}/>
      
      <Route path="/settings/manageDevice" exact component={ManageDevice}/> 
      <Route path="/" exact component={Login}/>


      </div>
      </Router>
    );
  }
}
