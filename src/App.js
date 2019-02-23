import React, { Component } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import "./css/styles.css";
import SideBar from "./components/sidebar";
import Status from "./components/status/Status";
import Analytics from "./components/analytics/Analytics";
import Schedules from "./components/schedules/Schedules";
import Settings from "./components/settings/Settings";
import Login from "./components/Login";
import axios from "axios";
import ManageUsers from "./components/settings/ManageUsers";
import ManageDevice from "./components/settings/ManageDevice";
var rp = require("request-promise")

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      switchStatus: null,
      dataLoaded: false,
      users: null,
      schedules: null,
      operationrecords: null
    };
  }

  componentDidMount() {
    this.getSwitchStatus();
  }

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

  setNewSchedule = sch => {
    console.log("appjsl60");
    let data = JSON.stringify(sch);
    axios
      .get(`http://localhost:3007/saveNewEvent/${data}`)
      .then(res => {
        this.setState({ operationrecords: res.data });

        this.getSchedules();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  deleteAnEvent = sch => {
    let data = JSON.stringify(sch);
    axios
      .get(`http://localhost:3007/deleteAnEvent/${data}`)
      .then(res => {
        this.setState({ operationrecords: res.data });
        this.getSchedules();
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

  switchRelayMode = (interavlValueInMinutes, props) => {
    axios
      .get(
        `http://localhost:3007/switchRelayMode/${interavlValueInMinutes * 60}`
      )
      .then(res => {});
  };

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
