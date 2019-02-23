import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
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
import {
  getSchedules,
  setNewSchedule,
  deleteAnEvent,
  getSwitchStatus,
  switchRelayMode
} from "./shellyFunctions";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      switchStatus: null,
      dataLoaded: false,
      schedules: null,
      timerInterval: null
    };
  }

  componentDidMount() {
    let status = getSwitchStatus();
    console.log(status);
    this.setState(status);
  }

  render() {
    return (
      <Router>
        <div>
          <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
          <Route
            path="/status"
            exactrender={() => (
              <Status
                switchStatus={this.state.switchStatus}
                switchRelayMode={switchRelayMode}
              />
            )}
          />

          <Route path="/analytics" exact render={() => <Analytics />} />

          <Route
            path="/schedules"
            exact
            render={() => (
              <Schedules
                getSchedules={getSchedules}
                setNewSchedule={setNewSchedule}
                deleteAnEvent={deleteAnEvent}
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
