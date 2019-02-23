import React, { Component } from "react";
import ToggleButton from "./ToggleButton";
import Roundy from "roundy";
import DialController from "./DialController";
import Countdown from "react-countdown-now";

export default class Status extends Component {
  constructor() {
    super();
    this.state = { dialValue: 0, showCountDownTimer: false };
  }
  handleChangeDialValue = value => {
    this.setState({ dialValue: value });
  };
  calculateMinsToString = () => {
    let mins = this.state.dialValue;
    if (mins === 0) {
      return ``;
    }
    if (mins < 60) {
      return `${mins}m`;
    }
    if (mins === 60) {
      return `1hr`;
    }
    if (mins > 60 && mins < 120) {
      return `1hr${mins - 60}m`;
    }

    if (mins === 120) {
      return `2hrs`;
    }
  };

  render() {
    const value = this.state.something;
    console.log(this.props);
    let timeString = this.calculateMinsToString();

    return (
      <div className="statusPage">
        <div id="dialController">
          <DialController
            dialValue={this.state.dialValue}
            changeDialValue={this.handleChangeDialValue}
          />
        </div>
        <div id="dialDigit">
          <b>{timeString}</b>
        </div>
        <div id="toggleButtonDiv">
          <ToggleButton
            label=""
            switchRelayMode={this.props.switchRelayMode}
            dialValue={this.state.dialValue}
            changeDialValue={this.handleChangeDialValue}
            turnOnTimerRendering={this.handleTurnOnTimerRendering}
          />
        </div>
        <center>
          {/* Quick acction buttons */
          /* <button>Turn on for 45 minutes</button><p/> */}
          {/* <button>Turn on for 1 hour</button> */}
        </center>
      </div>
    );
  }
}
