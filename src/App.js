import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import rp from 'request-promise'
import "./css/App.css";
import "./css/styles.css";
import SideBar from "./components/sidebar";
import Status from "./components/status/Status";
import Analytics from "./components/analytics/Analytics";
import Schedules from "./components/schedules/Schedules";
import Settings from "./components/settings/Settings";
import Login from "./components/Login";
import ManageUsers from "./components/settings/ManageUsers";
import ManageDevice from "./components/settings/ManageDevice";



 class App extends Component {
  constructor() {
    super();

    this.state = {
      switchStatus: null,
      dataLoaded: false,
      schedules: null,
      timerInterval: null
    };
  }
  async getSwitchStatus() {
    let status = await rp(`http://localhost:3007/status`)
    this.setState({switchStatus:JSON.parse(status)})
  }
  switchRelayMode = (interavlValueInMinutes, props)=> {
    rp(`http://localhost:3007/switchRelayMode/${interavlValueInMinutes * 60}`)
    this.setState({switchStatus:!this.state.switchStatus})
  }

   getSchedules = async () => {
    let data = await rp(`http://localhost:3007/getSchedules`)
    data = JSON.parse(data)
    this.setState({
          schedules: data.schedule_rules,
          isScheduleOn: data.schedule
        });
      
  }
  
 setNewSchedule = async (sch) => {
    let data = await rp(`http://localhost:3007/saveNewEvent/${sch}`)

        this.setState({ operationrecords: data });
  
        this.getSchedules();

  }
  
   deleteAnEvent= async(sch) => {
    sch = JSON.stringify(sch);
    let data = await rp(`http://localhost:3007/deleteAnEvent/${sch}`)
      
        this.setState({ operationrecords: data });
        this.getSchedules();
    
      };
  
  




  componentDidMount() {
    this.getSwitchStatus();
  }

  render() {
    
    return (
      <Router>
        <div>
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <Route
            path="/status"
            exact
            render={() => (
              <Status
                switchStatus={this.state.switchStatus}
                switchRelayMode={this.switchRelayMode}
              />
            )}
          />

          <Route path="/analytics" exact render={() => <Analytics />} />

          <Route
            path="/schedules"
            exact
            render={() => (
              <Schedules
                getSchedules={this.getSchedules}
                setNewSchedule={this.setNewSchedule}
                deleteAnEvent={this.deleteAnEvent}
                schedules={this.state.schedules}
                isScheduleOn={this.state.isScheduleOn}
              />
            )}
          />

          <Route
            path="/settings/manageUsers"
            exact
            render={() => <ManageUsers />}
          />
          <Route path="/settings" exact component={Settings} />
          <Route path="/settings/manageDevice" exact component={ManageDevice} />
          <Route path="/" exact component={Login} />
        </div>
      </Router>
    );
  }
}
export default App