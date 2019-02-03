import React, { Component } from 'react';
import OnOffToggleButton from './OnOffToggleButton'

export default class Status extends Component {
  
  render() {    
    return(
    <div className = "statusPage">
    
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
      
      
