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
  calculateMinsToString = ()=> {
    let mins = this.state.dialValue;
    if(mins<60){
      return(`${mins}m`)
    }
    if(mins>=60){
      return(`1hr${mins-60}m`)

    }
    if(mins>=120){
      return(`2hr${mins-120}m`)
    }
  }
  render() {
    const value = this.state.something;
    console.log(this.props);
    let timeString = this.calculateMinsToString();
    return (
      <div className="statusPage">
        <div id="dialController">
        <DialController
          turnSwitchOnWithInterval={this.props.turnSwitchOnWithInterval}
          dialValue = {this.state.dialValue}
          changeDialValue={this.handleChangeDialValue}
        />
        </div>
        <div id="dialDigit"><b>{timeString}</b></div>
        <div id="toggleButtonDiv">
        <OnOffToggleButton
          label=""
          switchStatus={this.props.switchStatus}
          turnSwitchOn={this.props.turnSwitchOn}
          turnSwitchOff={this.props.turnSwitchOff}
          turnSwitchOnWithInterval={this.props.turnSwitchOnWithInterval}
          dialValue = {this.state.dialValue}
          changeDialValue = {this.handleChangeDialValue}
        />
        </div>
        <center>
          {/* <button>Turn on for 45 minutes</button><p/> */}
          {/* <button>Turn on for 1 hour</button> */}
        </center>
      </div>
    );
  }
}
