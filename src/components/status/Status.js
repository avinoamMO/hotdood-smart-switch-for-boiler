import React, { Component } from "react";
import ToggleButton from "./ToggleButton";
import DialController from "./DialController";
// TODO: implement countdown ; import Countdown from "react-countdown-now"

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
    let timeString = this.calculateMinsToString();
    console.log('moishe')
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
          {/* TODO: add quick action buttons */}
        </center>
      </div>
    );
  }
}
