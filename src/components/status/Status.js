import React, { Component } from 'react';
import OnOffToggleButton from './OnOffToggleButton'
import Roundy from 'roundy';
import DialController from './DialController';

export default class Status extends Component {
  constructor(){
    super()
    this.state ={value:0}
  }
  render() {    
    const value = this.state.something
    console.log(this.props)
    return(
    <div className = "statusPage">
    <DialController turnSwitchOnWithInterval={this.props.turnSwitchOnWithInterval}/>

    <OnOffToggleButton 
    label ="" 
    switchStatus= {this.props.switchStatus} 
    turnSwitchOn={this.props.turnSwitchOn}
    turnSwitchOff={this.props.turnSwitchOff}/>
    <center>
    <button>Turn on for 45 minutes</button><p/>
    <button>Turn on for 1 hour</button>
    </center>
    </div>)
      }
      }
      
      


      