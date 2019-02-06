import React, { Component } from "react";
import OnOffToggleButton from "./OnOffToggleButton";
import Roundy from "roundy";
import DialController from "./DialController";

export default class Status extends Component {
  constructor() {
    super();
    this.state = { dialValue: 0 };
  }
  handleChangeDialValue = (value) =>{

    this.setState({dialValue:value})
  }
  render() {
    const value = this.state.something;
    console.log(this.props);

    return (
      <div className="statusPage">
        <div id="dialController">
        <DialController
          turnSwitchOnWithInterval={this.props.turnSwitchOnWithInterval}
          dialValue = {this.state.dialValue}
          changeDialValue={this.handleChangeDialValue}
        />
        </div>
        <div id="dialDigit"><b>{this.state.dialValue}</b>m</div>
        <OnOffToggleButton
          label=""
          switchStatus={this.props.switchStatus}
          turnSwitchOn={this.props.turnSwitchOn}
          turnSwitchOff={this.props.turnSwitchOff}
          turnSwitchOnWithInterval={this.props.turnSwitchOnWithInterval}
          dialValue = {this.state.dialValue}
        />
        <center>
          {/* <button>Turn on for 45 minutes</button><p/> */}
          {/* <button>Turn on for 1 hour</button> */}
        </center>
      </div>
    );
  }
}
